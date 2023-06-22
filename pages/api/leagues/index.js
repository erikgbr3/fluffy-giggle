import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getLeague (req, res);

        case 'POST':
            return addLeague (req, res);

        case 'PUT':
            return updateLeague (req, res);

        case 'DELETE':
            return deleteLeague (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getLeague = async (req, res) => {
    try {
        const { ownerId } = req.query;

        let leagues = [];
        if (ownerId) {
            leagues = await db.League.findAll({
                where: {
                    ownerId,  
                },
                include: ['user'],
            });
        } else {
            leagues = await db.League.findAll({
                include: ['user'],
            });
        }

        return res.json(cities);
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

const addLeague = async (req, res) => {
    try {
        console.log(req.body);
        
        const league = await db.League.create({...req.body});
        res.json({
            league,
            message: 'La Liga fue registrada correctamente'
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

const updateLeague = async (req, res) => {
    try {
        const { id } = req.body;

        await db.League.update({...req.body}, {
            where: {
                id:id
            }
        })
        res.json({
            message: 'La Liga fue actualizada'
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

  const deleteLeague = async (req, res) => {
    console.log('Delete ligue method called');
    try {
        const { id } = req.query;

      const league = await db.League.findOne({ where: { id: id } });

      if (!league) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró la liga',
        });
      }

        await league.destroy();

        res.json({
            message: 'La liga fue Eliminada'
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