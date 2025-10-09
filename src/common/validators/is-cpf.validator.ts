import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

// 1. Lógica de Validação
@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  // O underscore (_) em args é uma convenção para variáveis não utilizadas
  validate(cpfValue: string, _args: ValidationArguments) {
    if (!cpfValue) {
      return false; // Se o valor for vazio, a validação de @IsNotEmpty deve lidar com isso
    }

    // 1. Limpa o CPF (remove pontos e traços)
    const cleanedCpf = cpfValue.replace(/[^\d]/g, '');

    // 2. Verifica se o CPF é matematicamente válido
    return cpf.isValid(cleanedCpf);
  }

  // O underscore (_) em args elimina o warning de variável não usada
  defaultMessage(_args: ValidationArguments) {
    return 'O CPF informado é inválido.';
  }
}

// 2. Decorador @IsCpf
export function IsCpf(validationOptions?: ValidationOptions) {
  // Substituímos o 'Object' com 'object' (primitivo)
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint,
    });
  };
}
