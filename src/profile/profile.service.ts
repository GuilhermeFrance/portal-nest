import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'node:fs/promises';
import * as path from 'path';
import sharp from 'sharp';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async handleUpload(userId: number, file: Express.Multer.File) {
    try {
      const uploadsDir = path.resolve('uploads');
      const userDir = path.join(uploadsDir, String(userId));
      await fs.mkdir(userDir, { recursive: true });

      const thumbName = `thumb_${file.filename}`;
      const thumbPath = path.join(userDir, thumbName);

      await sharp(file.path)
        .resize(300, 300, { fit: 'cover' })
        .toFile(thumbPath);

      const image = await this.prisma.image.create({
        data: {
          fileName: file.filename,
          mimeType: file.mimetype,
          size: file.size,
          path: path.relative(process.cwd(), file.path),
          url: `/uploads/${userId}/${file.filename}`,
          owner: { connect: { id: userId } },
          isProfile: true,
        },
      });

      await this.prisma.client.update({
        where: { id: userId },
        data: {
          profileImage: {
            connect: { id: image.id },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Erro no upload',
      );
    }
  }
  async deletePhoto(userId: number, imageId: number) {
    const img = await this.prisma.image.findUnique({ where: { id: imageId } });
    if (!img || img.ownerId !== userId) throw new Error('Não permitido');
    try {
      await fs.unlink(path.resolve(img.path));
    } catch (e) {
      console.log(e);
    }
    await this.prisma.image.delete({ where: { id: imageId } });

    await this.prisma.client.update({
      where: { id: userId },
      data: {
        profileImage: {
          connect: { id: imageId },
        },
      },
    });
    return { sucess: true };
  }
}
