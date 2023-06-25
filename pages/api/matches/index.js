//Detecta el reqyesr e invoca la función.

import db from "@/database/models"

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return matchesList(req, res);
    case 'POST':
      return addMatch(req, res);
    case 'PUT':
      return editMatch(req, res);
    case 'DELETE': 
      return deleteMatch(req, res);
    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const matchesList = async (req, res) => {
  try {
      // leer los Partidos
      const matches = await db.Match.findAll();  

      return res.json(matches);
  } catch (error) {
      return res.status(400).json(
          {
              error: true,
              message: `Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}

const addMatch = async (req, res) => {
  try {
    //Esto se recibe
    console.log(req.body);
    //Los datos recibidos son guardados
    const matches = await db.Match.create({...req.body});
    res.json({
      matches,
      message: "Partido Creado"
    });
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

const editMatch = async(req, res) => {
  try {
    //Hacer cambios en el registro con el ID correspondiente
    const {id} = req.query;
    //Aplicar Cambios
    await db.Match.update({...req.body}, {
      where: {
        id:id
      }
    })
    res.json({
      message: "El partido fue Actualizado"
    });
  } catch (error) {
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}

//Eliminar Encuentro
const deleteMatch = async(req, res) =>{
  try {
    const {id} = req.query;
    await db.Match.destroy({
      where: {
        id: id
      }
    });
    res.json({
      message: "El partido fue eliminado"
    });
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}
