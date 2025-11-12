import {
  ValidateBy,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ClientRepository } from 'src/clients/repository/client.repository';

@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly clientRepository: ClientRepository) {}
  async validate(email: string): Promise<boolean> {
    try {
      await this.clientRepository.findbyEmail(email);
      return true;
    } catch {
      return false;
    }
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isEmailUnique',
      validator: IsEmailUniqueConstraint,
    },
    validationOptions,
  );
}
