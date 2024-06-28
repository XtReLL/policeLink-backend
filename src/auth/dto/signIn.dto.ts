import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class SignInLocalDto {
  //class-validator
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  //graphql
  @Field()
  readonly email: string;

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
}
