import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getClub (req, res);

        case 'POST':
            return addClub (req, res);

        case 'PUT':
            return updateClub (req, res);

        case 'DELETE':
            return deleteClub (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getClub = async (req, res) => {
    try {
        const { fieldId } = req.query;

        let clubs = [];

        if (fieldId) {
            clubs = await db.Club.findAll({
                where: {
                    fieldId,  
                },
                include: ['sportfield'],
            });
        } else {
            clubs = await db.Club.findAll({
            });
        }
        return res.json(clubs);
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

const addClub = async (req, res) => {
    try {
        console.log(req.body);
        
        const club = await db.Club.create({...req.body});
        res.json({
            club,
            message: 'El club fue registrado correctamente'
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
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
}

const updateClub = async (req, res) => {
    try {
        let { id } = req.query;

        await db.Club.update({...req.body}, {
            where: {
                id : id
            },
        })
        res.json({
            message: 'El club fue actualizado'
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

  const deleteClub = async (req, res) => {
    console.log('Delete club method called');
    try {
        const { id } = req.query;

      const club = await db.Club.findOne({ where: { id: id } });

      if (!club) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el club',
        });
      }

        await club.destroy();

        res.json({
            message: 'El club fue eliminado'
        })

    } catch(error){
        console.log('Error in delete league', error);
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