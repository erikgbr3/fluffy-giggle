import db from "database/models";

export default async function handler(req, res) {
  try {
    // Obtener todos los registros de la tabla de posiciones
    const posiciones = await db.PositionTableLeague.findAll();

    // Recorrer cada registro y actualizar los valores correspondientes
    for (const posicion of posiciones) {
      const { clubId } = posicion;

      // Obtener los datos actualizados para el club correspondiente
      const club = await db.Club.findByPk(clubId);

      // Actualizar los valores en la tabla de posiciones
      await posicion.update({
        matchesWon: club.matchesWon,
        tiedMatches: club.tiedMatches,
        lostGames: club.lostGames,
        gamesPlayed: club.matchesWon + club.tiedMatches + club.lostGames,
        GolesFavor: club.GolesFavor,
        GolesContra: club.GolesContra,
        DF: club.GolesFavor - club.GolesContra,
        points: club.matchesWon * 3 + club.tiedMatches,
      });
    }

    res.status(200).json({ message: 'Tabla de posiciones actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la tabla de posiciones' });
  }
}