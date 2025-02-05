import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthHelper } from './auth.helper';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@config';
import { GameServerModule } from '@src/game-server/game-server.module';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { security } = configService.get();

        return { secret: security.jwtUsersSecret };
      },
      inject: [ConfigService],
    }),
    GameServerModule,
    UserModule,
  ],
  providers: [AuthService, AuthResolver, AuthHelper],
  exports: [AuthHelper],
})
export class AuthModule {}
