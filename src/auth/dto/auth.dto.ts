import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserToClientOutput {
  @Field()
  refreshJwt: string;

  @Field()
  clientJwt: string;
}
