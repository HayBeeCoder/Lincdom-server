import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { safeEmail } from 'src/helpers/safe-email';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // async signIn(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);

  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: user.userId, username: user.username };

  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;
    const _safeEmail = safeEmail(email);
    const userExists = this.prisma.user.findFirst({
      where: {
        email: _safeEmail,
      },
    });
    if (userExists)
      throw new ConflictException('User with email already exists!');
    const hashedPassword = await hash(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: _safeEmail,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });

      if (user) {
        delete user.password;
        return user;
      }
    } catch (error) {}
  }
}
