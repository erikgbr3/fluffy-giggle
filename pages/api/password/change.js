import { passwordEmail } from '@/utils/passwordEmail';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import db from "database/models";

export default async function handler(req, res){
  try {

    const user = await db.User.findOne(
        {
            where: { 
                passwordResetToken: req.body.token,
                passwordResetExpire: {[Op.gt]: new Date()},
             },
        }
    );

    if(!user) {
        return res.status(400).json({
            error: true,
            message: 'El link de recuperaci[on es inválido o ha expirado.'
        });
    }

   if(!req.body.password) {
        return res.status(400).json({
            error: true,
            message: 'La constraseña es obligatoria.'
        });
   }
   
   const salt = await bcrypt.genSalt(10);

   // cifrar la contraseña y meterla en los datos del usuario
   user.password = await bcrypt.hash(req.body.password, salt);  
   user.passwordResetToken = '';
   user.passwordResetExpire = null;
   await user.save();

   res.json({
    message: 'La constraseña ha sido guardada.',
   });

  } catch (error) {
    console.log(error);

    res.json({ error: true, message: 'Error al guardar la nueva contraseña'});
  }
};
