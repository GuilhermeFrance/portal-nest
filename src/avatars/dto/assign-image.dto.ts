import { IsInt } from 'class-validator';

export class AssignAvatarDto {
  @IsInt()
  avatarID: number;
}
