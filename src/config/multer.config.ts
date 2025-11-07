import { diskStorage } from 'multer';
import { extname, basename } from 'path';
import { randomBytes } from 'crypto';

export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const rnd = randomBytes(8).toString('hex');
      const ext = extname(file.originalname);
      cb(null, `${Date.now()}-${rnd}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Tipo de arqiovo inválido'), false);
  },
};
