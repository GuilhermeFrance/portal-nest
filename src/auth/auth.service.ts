import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import * as bcrypy from 'bcrypt';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { ClientPayload } from './models/ClientPayload';
import { JwtService } from '@nestjs/jwt';
import { ClientToken } from './models/ClientToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientsService,
    private readonly jwtService: JwtService,
  ) {}

  login(client: ClientEntity): ClientToken {
    const payload: ClientPayload = {
      sub: client.id,
      email: client.email,
      name: client.name,
      badges: client.badgesKey,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const client = await this.clientService.findByEmail(email);
    if (client) {
      const isPasswordValid = await bcrypy.compare(password, client.password);

      if (isPasswordValid) {
        return {
          ...client,
          password: undefined,
        };
      }
    }
    throw new Error('Email ou senha não conferem!');
  }
}
