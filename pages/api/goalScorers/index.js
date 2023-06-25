import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getGoalScorers (req, res);

        case 'POST':
            return addGoalScorer (req, res);

        case 'PUT':
            return updateGoalScorer (req, res);

        case 'DELETE':
            return deleteGoalScorer (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getGoalScorers = async (req, res) => {
    try {
            const goalScorers = await db.GoalScore.findAll({
            });

        return res.json(goalScorers);
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

const addGoalScorer = async (req, res) => {
    try {
        console.log(req.body);
        
        const goalScorer = await db.GoalScore.create({...req.body});
        res.json({
            goalScorer,
            message: 'El marcador fue registrado correctamente'
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

const updateGoalScorer = async (req, res) => {
    try {
        let { id } = req.query;

        await db.GoalScore.update({...req.body}, {
            where: {
                id : id
            },
        })
        res.json({
            message: 'El marcador fue actualizado'
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

  const deleteGoalScorer = async (req, res) => {
    console.log('Delete goal scorer method called');
    try {
        const { id } = req.query;

      const goalScorer = await db.GoalScore.findOne({ where: { id: id } });

      if (!goalScorer) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el marcador',
        });
      }

        await goalScorer.destroy();

        res.json({
            message: 'El marcador fue eliminado'
        })

    } catch(error){
        console.log('Error in delete goal scorer', error);
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