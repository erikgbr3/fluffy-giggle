import { passwordEmail } from '@/utils/passwordEmail';
import bcrypt from 'bcrypt';
import db from "database/models";

export default async function handler(req, res){
  try {
    if(!req.body.email) {
        return res.status(400).json({
            error: true,
            message: 'El email es obligatorio.',
        });
    }

    const user = await db.User.findOne(
        {
            where: { email: req.body.email },
        }
    );

    if(!user) {
        return res.status(404).json({
            error: true,
            message: 'El usuario no existe.'
        });
    }

    let token = await bcrypt.hash(user.email + Date.now().toString(), 10);

    token = token.replace(/\//g, "-");

    user.passwordResetToken = token;
    user.passwordResetExpire = Date.now() + 3600000;

    await user.save();

    const sendEmail = await passwordEmail(
        user.username,
        user.email,
        token
    );

    if(sendEmail) {
        return res.json({
            message: 'El email de recuperación ha sido enviado.'
        })
    }

    res.status(503).json({
        error: true,
        message: 'Falló el envío de email.'
    })

  } catch (error) {
    console.log(error);

    res.json({ error: true, message: 'Error al recuperar la contraseña'});
  }
};
