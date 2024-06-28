import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export interface IClientJwt {
  userId: number;
  gameServerId: number;
}

export enum AuthProviders {
  LOCAL,
  DISCORD,
}

@ObjectType('AuthProviderFielddOutput')
@InputType('AuthProviderFieldInput')
export class AuthProviderField {
  @Field(() => AuthProviders)
  provider: AuthProviders;

  @Field({ defaultValue: '' })
  token_type?: string;

  @Field()
  expires_in: number;

  @Field({ defaultValue: '' })
  refresh_token?: string;

  @Field({ defaultValue: '' })
  email?: string;

  @Field({ defaultValue: '' })
  password?: string;
}

registerEnumType(AuthProviders, { name: 'AuthProviders' });
