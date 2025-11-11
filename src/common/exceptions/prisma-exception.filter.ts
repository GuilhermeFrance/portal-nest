import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const field = exception.meta?.target as string[];
        return response.status(409).json({
          statusCode: 409,
          error: 'Conflict',
          message: this.getUniqueErrorMessage(field?.[0]),
          field: field?.[0],
        });
      }
      case 'P2025':
        return response.status(404).json({
          statusCode: 404,
          error: 'NotFound',
          message: 'Registro não encontrado',
        });
      default:
        console.error(
          'Unhandled Prisma Error: ',
          exception.code,
          exception.message,
        );
        return response.status(500).json({
          statusCode: 500,
          error: 'InternalServerError',
          message: 'Erro interno do servidor',
          code: exception.code,
        });
    }
  }

  private getUniqueErrorMessage(field: string): string {
    const messages = {
      email: 'Email em uso.',
      cpf: 'CPF em uso.',
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return messages[field] || 'Valor duplicado encontrado';
  }
}
