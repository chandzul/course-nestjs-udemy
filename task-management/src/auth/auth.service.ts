import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRespository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRespository)
    private userRepository: UserRespository,
    private jwtService: JwtService
  ) {
    // 
  }

  signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
