import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LoginWorkflowType } from '@src/game-server/interfaces/gameServer.interface';

@ObjectType()
export class AuthEntity {
  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field({ nullable: true })
  clientJwt?: string;

  @Field(() => LoginWorkflowType)
  loginWorkflow: LoginWorkflowType;
}
