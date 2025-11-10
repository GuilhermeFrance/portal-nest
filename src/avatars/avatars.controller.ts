import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Res,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
} from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import * as multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AssignAvatarDto } from './dto/assign-image.dto';

const memoryStorage = multer.memoryStorage();
@IsPublic()
@Controller()
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Post('avatars/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Apenas imagens são permitidas'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado');
    }
    const avatar = await this.avatarsService.create({
      name: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      data: file.buffer,
    });
    return { id: avatar.id, name: avatar.name };
  }
  @Get('avatars/id/:id')
  async serve(@Param('id') id: string, @Res() res: Response) {
    const avatar = await this.avatarsService.findOne(Number(id));
    if (!avatar) return res.status(404).send('NotFound');

    const contentType = avatar.mimetype ?? 'application/octet-stream';
    res.setHeader('Content-type', contentType);

    const buffer = Buffer.from(avatar.data);
    res.send(buffer);
  }

  @Get('avatars/all')
  async list() {
    const avatars = this.avatarsService.findAll();
    return (await avatars).map(a => ({
      id: a.id,
      name: a.name,
      size: a.size,
      mimetype: a.mimetype,
      url: `http://localhost:3000/avatars/id/${a.id}`,
    }));
  }

  @Put('assign/:clientId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async assign(
    @Param('clientId') clientId: string,
    @Body() body: AssignAvatarDto,
  ) {
    await this.avatarsService.assignToClient(Number(clientId), body.avatarID);
    return { ok: true };
  }
}
