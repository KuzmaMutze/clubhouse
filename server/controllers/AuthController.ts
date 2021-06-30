import express from 'express';
import { Code, User } from '../../models';
import axios from 'axios';

const randomeCode = (max: number = 9999, min: number = 1000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class AuthController {
  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }

  githubCallback(req: express.Request, res: express.Response) {
    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        req.user,
      )}', '*');window.close();</script>`,
    );
  }

  async smsActivate(req: express.Request, res: express.Response) {
    const userId = req.user.id;
    const smsCode = req.query.code;

    if (!smsCode) {
      return res.status(400).send({ message: 'Введите код активации' });
    }

    const whereQuery = { code: smsCode, user_id: userId };

    try {
      const findCode = await Code.findOne({
        where: whereQuery,
      });

      if (findCode) {
        await Code.destroy({
          where: whereQuery,
        });
        await User.update({ isActive: 1 }, { where: { id: userId } });
        return res.status(201).send();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error with activate acc',
      });
    }
  }

  async smsSend(req: express.Request, res: express.Response) {
    const phone = req.query.phone;
    const userId = req.user.id;
    const smsCode = randomeCode();
    if (!phone) {
      return res.status(400).send();
    }

    try {
      // await axios.get(
      //   `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=&msg=${smsCode}`,
      // );

      const findCode = await Code.findOne({
        where: {
          // code: smsCode,
          user_id: userId,
        },
      });

      if (findCode) {
        return res.json({ message: 'Код уже был отправлен' });
      }

      await Code.create({
        code: smsCode,
        user_id: userId,
      });

      return res.status(200).send();
    } catch (error) {
      res.status(500).json({
        error: error,
        message: 'Error with SMS message',
      });
    }
  }
}

export default new AuthController();
