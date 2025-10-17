import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientFromJwt } from '../models/ClientFromJwt';
import { ClientPayload } from '../models/ClientPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: ClientPayload): Promise<ClientFromJwt> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
