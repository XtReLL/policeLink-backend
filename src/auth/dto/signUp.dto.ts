import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpLocalDto {
  //class-validator
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  //graphql
  @Field()
  readonly email: string;

  //class-validator
  @MinLength(4, {
    message: 'username too short',
  })
  @MaxLength(32, {
    message: 'username too long',
  })
  @IsNotEmpty()
  //graphql
  @Field()
  readonly username: string;

  //class-validator
  @MinLength(8, {
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  //graphql
  @Field()
  readonly password: string;

  //class-validator
  @Match('password')
  @IsNotEmpty()
  //graphql
  @Field()
  readonly passwordConfirm: string;
}
