import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return listSuscriptions (req, res);

        case 'POST':
            return addSuscription (req, res);

        case 'PUT':
            return editSuscription (req, res);

        case 'DELETE':
            return deleteSuscription (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const listSuscriptions = async (req, res) => {
    try {
        const suscriptions = await db.Suscription.findAll()
        return res.json(suscriptions);
    } catch(error){
        console.log(error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }

const addSuscription = async (req, res) => {
    try {
        const suscription = await db.Suscription.create({...req.body});
        res.json({
            suscription,
            message: 'Club registrado en la liga'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
}

const editSuscription = async (req, res) => {
    try {
        const { id } = req.query;

        await db.Suscription.update({...req.body}, {
            where: {
                id:id
            }
        })
        res.json({
            message: 'Hubo cambios en la suscripción'
        });

    } catch(error){
        console.log(error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }

  const deleteSuscription = async (req, res) => {
    try {
        const { id } = req.query;

      const suscription = await db.Suscription.findOne({ where: { id: id } });

      if (!suscription) {
        return res.status(404).json({
          error: true,
          message: 'No fue encontrada la suscripción',
        });
      }

        await suscription.destroy();

        res.json({
            message: 'Club dado de baja de la liga'
        })

    } catch(error){
        console.log('Error al eliminar', error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }