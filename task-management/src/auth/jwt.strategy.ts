import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { User } from "./user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRespository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRespository)
    private userRepository: UserRespository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}