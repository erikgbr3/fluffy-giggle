import db from "database/models";

export default async function posicionadorTabla() {
  try {
    // Obtener todos los registros de la tabla de posiciones
    const posiciones = await db.PositionTableLeague.findAll();

    // Recorrer cada registro y actualizar los valores correspondientes
    for (const posicion of posiciones) {
      const { clubId } = posicion;

      // Obtener los datos actualizados para el club correspondiente
      const club = await db.Club.findByPk(clubId);

      // Calcular los valores actualizados en función de los resultados de los partidos
      const resultadosPartidos = await Promise.all([
        db.Match.findAll({
          where: {
            homeTeamId: clubId,
          },
        }),
        db.Match.findAll({
          where: {
            visitorTeamId: clubId,
          },
        }),
      ]);

      let partidosGanados = 0;
      let partidosEmpatados = 0;
      let partidosPerdidos = 0;
      let golesFavor = 0;
      let golesContra = 0;

      for (const resultados of resultadosPartidos) {
        for (const resultado of resultados) {
          if (resultado.homeTeamId === clubId) {
            golesFavor += resultado.scoreHome;
            golesContra += resultado.scoreVisitor;
      
            if (resultado.scoreHome > resultado.scoreVisitor) {
              partidosGanados++;
            } else if (resultado.scoreHome < resultado.scoreVisitor) {
              partidosPerdidos++;
            } else {
              partidosEmpatados++;
            }
          } else if (resultado.visitorTeamId === clubId) {
            golesFavor += resultado.scoreVisitor;
            golesContra += resultado.scoreHome;
      
            if (resultado.scoreVisitor > resultado.scoreHome) {
              partidosGanados++;
            } else if (resultado.scoreVisitor < resultado.scoreHome) {
              partidosPerdidos++;
            } else {
              partidosEmpatados++;
            }
          }
        }
      }
      
      // Actualizar los valores en la tabla de posiciones
      await posicion.update({
        matchesWon: partidosGanados,
        tiedMatches: partidosEmpatados,
        lostGames: partidosPerdidos,
        gamesPlayed: partidosGanados + partidosEmpatados + partidosPerdidos,
        gf: golesFavor,
        gc: golesContra,
        df: golesFavor - golesContra,
        points: partidosGanados * 3 + partidosEmpatados,
      });

      
    }

    return {success: true,  message: 'Tabla de posiciones actualizada' };
  } catch (error) {
    console.error(error);
    return {success: false,  message: 'Error al actualizar la tabla de posiciones' };
  }
}
