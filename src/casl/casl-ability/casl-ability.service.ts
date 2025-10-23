import { PureAbility } from '@casl/ability';
import { createPrismaAbility, Subjects } from '@casl/prisma';
import { AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import {
  Client,
  Request,
  RequestStatus,
  Role,
  Type,
  User,
} from '@prisma/client';

export type PermActions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type BadgeKey = 'admin' | 'manager' | 'requester' | 'employee';

export type PermitionResources =
  | Subjects<{
      User: User;
      Requests: Request;
      Status: RequestStatus;
      Client: Client;
      Role: Role;
      Type: Type;
    }>
  | 'all';

export type AppAbility = PureAbility<[PermActions, PermitionResources]>;

export type DefinePermissions = (
  client: Client,
  builder: AbilityBuilder<AppAbility>,
) => void;

const rolePermissionsMap: Record<BadgeKey, DefinePermissions> = {
  admin(client, { can }) {
    can('manage', 'all');
  },
  manager(client, { can }) {
    can('read', 'all');
    can('update', 'all');
    can('create', 'User');
  },
  requester(client, { can }) {
    can('create', 'Requests');
    can('read', 'Requests', { userId: client.id });
    can('delete', 'Requests', { userId: client.id });
  },
  employee(client, { can }) {
    can('read', 'Requests', { userId: client.id });
    can('manage', 'Status');
    can('delete', 'Requests');
  },
};

@Injectable()
export class CaslAbilityService {
  ability: AppAbility;
  createForClient(client: Client) {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    rolePermissionsMap[(client.badgesKey ?? 'requester') as BadgeKey](
      client,
      builder,
    );
    this.ability = builder.build();
    return this.ability;
  }
}
