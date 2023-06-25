import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getSportField (req, res);

        case 'POST':
            return addSportField (req, res);

        case 'PUT':
            return updateSportField (req, res);

        case 'DELETE':
            return deleteSportField (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getSportField = async (req, res) => {
    try {
            const sportFields = await db.SportField.findAll({
            });

        return res.json(sportFields);
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

const addSportField = async (req, res) => {
    try {
        console.log(req.body);
        
        const sportfield = await db.SportField.create({...req.body});
        res.json({
            sportfield,
            message: 'El campo fue registrado correctamente'
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

const updateSportField = async (req, res) => {
    try {
        let { id } = req.query;

        await db.SportField.update({...req.body}, {
            where: {
                id : id
            },
        })
        res.json({
            message: 'El campo fue actualizado'
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

  const deleteSportField = async (req, res) => {
    console.log('Delete sport field method called');
    try {
        const { id } = req.query;

      const sportField = await db.SportField.findOne({ where: { id: id } });

      if (!sportField) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el campo',
        });
      }

        await sportField.destroy();

        res.json({
            message: 'El campo fue eliminado'
        })

    } catch(error){
        console.log('Error in delete sport field', error);
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