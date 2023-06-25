//Detecta el reqyesr e invoca la función.

import db from "@/database/models"

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return foulCardsList(req, res);
    case 'POST':
      return addCard(req, res);
    case 'PUT':
      return updateCard(req, res);
    case 'DELETE': 
      return deleteCard(req, res);
    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const foulCardsList = async (req, res) => {
  try {
      // leer las tarjetas de amonestación
      const foulCards = await db.FoulCard.findAll({});  

      return res.json(foulCards);
  } catch (error) {
      return res.status(400).json(
          {
              error: true,
              message: `Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}


//Agregar una tarjeta a un jugador
const addCard = async (req, res) => {
  try {
    //Datos del cuerpo
    console.log(req.body);
    //Agregar la tarjeta
    const foulCard = await db.FoulCard.create({...req.body});
    res.json({
      foulCard,
      message: "Jugador Amonestado"
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

//Realizar cambios
const updateCard = async(req, res) => {
  try {
    const {id} = req.query;
    await db.FoulCard.update({...req.body}, {
      where: {
        id:id
      }
    })
    res.json({
      message: "Se realizaron Ajustes en la amonestación"
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

//eliminar amonestación
const deleteCard = async(req, res) =>{
  try {
    const {id} = req.query;
    await db.FoulCard.destroy({
      where: {
        id: id
      }
    });
    res.json({
      message: "La tarjeta fue quitada"
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
