import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import nanoid from 'nanoid';
import fs from 'fs';
import sharp from 'sharp';
import cors from 'cors';
import { Code } from '../models';

// declare global {
//   namespace Express {
//     interface User extends UserData {}
//   }
// }

dotenv.config({
  path: 'server/.env',
});

import './core/db';

import { passport } from './core/passport';

import AuthController from './controllers/AuthController';

const app = express();
const uploader = multer({
  storage: multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, '../public/avatars/');
    },
    filename: function (_, file, cb) {
      cb(null, file.fieldname + '-' + nanoid(6) + '.' + file.filename.split('/').pop());
    },
  }),
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.post('/upload', uploader.single('photo'), (req, res) => {
  const filePath = req.file.path;
  sharp(filePath)
    .resize(150, 150)
    .toFormat('jpeg')
    .toFile(filePath.replace('.png', '.jpeg'), (err) => {
      if (err) {
        throw err;
      }

      fs.unlinkSync(filePath);

      res.json({
        url: `/avatars/${req.file.filename.replace('.png', '.jpeg')}`,
      });
    });
});

app.get(
  '/auth/sms/activate',
  passport.authenticate('jwt', { session: false }),
  AuthController.smsActivate,
);

app.get('/auth/sms', passport.authenticate('jwt', { session: false }), AuthController.smsSend);
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/me', passport.authenticate('jwt', { session: false }), AuthController.getMe);
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  AuthController.githubCallback,
);

app.listen(3001, () => {
  console.log('SERVER RUNNING!!!!!');
});
