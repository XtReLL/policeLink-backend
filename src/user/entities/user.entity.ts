import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '../interfaces/user.interface';
import { AuthProviderField } from '@src/auth/interfaces/auth.interface';
import { GameServerEntity } from '@src/game-server/entities/gameServer.entity';

@Entity('users')
@ObjectType()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ type: 'varchar' })
  @Field()
  name!: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.CLIENT,
  })
  @Field(() => UserType)
  userType: UserType;

  @Column('jsonb')
  @Field(() => AuthProviderField)
  authProvider: AuthProviderField;

  @Column({ type: 'int4' })
  gameServerId: number;

  @ManyToOne(() => GameServerEntity, (gameServer) => gameServer.users)
  @Field(() => GameServerEntity, { nullable: true })
  gameServer: Promise<GameServerEntity>;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt!: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
registerEnumType(UserType, { name: 'UserType' });
