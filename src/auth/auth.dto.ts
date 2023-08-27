import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  isNotEmpty,
} from 'class-validator';

// Regular expression that matches a mix of alphabets, numbers, and special characters
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    // here, $constraint1 will be replaced with "10", and $value with actual supplied value
    message: 'Password is too short. Minimal length is 8 characters.',
  })
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least one alphabet, one number, and one special character.',
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    // here, $constraint1 will be replaced with "10", and $value with actual supplied value
    message: 'Password is too short. Minimal length is 8 characters.',
  })
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least one alphabet, one number, and one special character.',
  })
  password?: string;

  // @IsString()
  // origin?: string;

  // @IsString()
  // @Length(6)
  // @IsOptional()
  // code?: string;
}
