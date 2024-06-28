import { AuthenticationError } from '@nestjs/apollo';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { compare, genSalt, hash } from 'bcrypt';

import { AuthProviders, IClientJwt } from './interfaces/auth.interface';
import { UserEntity } from '@src/user/entities/user.entity';
import { AuthEntity } from './entities/auth.entity';
import { GameServerEntity } from '@src/game-server/entities/gameServer.entity';
import { UserRepository } from '@src/user/user.repository';
import { SignUpLocalDto } from './dto/signUp.dto';
import { SignInLocalDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(GameServerEntity)
    private readonly gameServerRepository: Repository<GameServerEntity>,
    private readonly jwtService: JwtService,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  verifyAndParseJwt(data: string): IClientJwt {
    try {
      return this.jwtService.verify(data);
    } catch (e) {
      throw new AuthenticationError(`can't find user`);
    }
  }

  async signToken(gameServerId: number, user: UserEntity): Promise<AuthEntity> {
    const gameServer = await this.gameServerRepository.findOneOrFail({
      where: { id: gameServerId },
    });
    const result = new AuthEntity();
    if (user) {
      const expiresIn = user.authProvider.expires_in;
      result.userId = user.id;
      result.clientJwt = this.jwtService.sign(
        {
          userId: user.id,
          gameServerId,
        },
        {
          expiresIn: expiresIn ? expiresIn : gameServer.userTokenExpireIn,
        },
      );
    }
    result.loginWorkflow = gameServer.loginWorkflow;

    return result;
  }

  async signUp(
    gameServer: GameServerEntity,
    data?: SignUpLocalDto & Required<{ provider: AuthProviders }>,
  ) {
    try {
      switch (data.provider) {
        case AuthProviders.LOCAL:
          const { email, password } = data;
          const salt = await genSalt();
          const user = await this.userRepository.createUser(
            this.userRepository.create({
              authProvider: {
                provider: AuthProviders.LOCAL,
                email,
                password: await hash(password, salt),
              },
            }),
          );
          return this.signToken(gameServer.id, user);

        case AuthProviders.DISCORD:
          break;
      }
    } catch (error) {
      throw error;
    }
  }

  async signIn(
    gameServer: GameServerEntity,
    signInDto: SignInLocalDto,
  ): Promise<AuthEntity> {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: {
        gameServerId: gameServer.id,
        authProvider: {
          provider: AuthProviders.LOCAL,
          email,
        },
      },
    });
    if (!user) {
      throw new AuthenticationError('Invalid email');
    }

    const isPasswordMatch: boolean = await compare(
      password,
      user.authProvider.password,
    );
    if (!isPasswordMatch) {
      throw new AuthenticationError('Invalid password');
    }

    return this.signToken(gameServer.id, user);
  }

  restoreSession(gameServerId: number, user: UserEntity) {
    return this.signToken(gameServerId, user);
  }

  authenticate(data: string): Promise<UserEntity> {
    const userInfo = this.verifyAndParseJwt(data);
    if (userInfo) {
      return this.userRepository.findOne({ where: { id: userInfo.userId } });
    }
  }
}
