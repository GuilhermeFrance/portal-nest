/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function MinNonWhiteSpaceLength(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'minNonWhitespaceLength',
      target: object.constructor,
      propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value === 'string') return false;
          const nonWs = value.replace(/\s+/g, '');
          return nonWs.length >= min;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ter pelo menos ${min} caracteres excluindo espaço`;
        },
      },
    });
  };
}
