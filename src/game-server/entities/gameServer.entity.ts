import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { LoginWorkflowType } from '../interfaces/gameServer.interface';
import { TimezoneIANA } from '@typings/timezone';
import { UserEntity } from '@src/user/entities/user.entity';

@Entity('game_servers')
@ObjectType()
export class GameServerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  key!: string;

  @Column({ default: TimezoneIANA.UTC })
  @Field({ nullable: true })
  timezone: TimezoneIANA;

  @Column({ type: 'varchar', default: '7d' })
  @Field({ defaultValue: '7d' })
  userTokenExpireIn: string;

  @Column({
    type: 'enum',
    enum: LoginWorkflowType,
    default: LoginWorkflowType.AllowAnonymous,
  })
  @Field(() => LoginWorkflowType)
  loginWorkflow: LoginWorkflowType;

  @Column({ type: 'varchar', nullable: true })
  @Field({ nullable: true })
  logoImage?: string;

  @OneToMany(() => UserEntity, (users) => users.gameServer)
  @Field(() => [UserEntity], { nullable: true })
  users: Promise<UserEntity[]>;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}

registerEnumType(LoginWorkflowType, { name: 'LoginWorkflowType' });
