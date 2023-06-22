// ResultController.js
import db from "database/models";

// Supongamos que tienes un método para registrar el resultado de un partido
const registerMatchResult = async (req, res) => {
  const { winnerClubId, draw, clubId } = req.body;

  try {
    // Actualizar los atributos de la tabla de posiciones según el resultado del partido
    const position = await db.PositionTableLeague.findOne({
      where: { clubId },
    });

    if (winnerClubId === clubId) {
      position.matchesWon += 1;
      position.points += 3;
    } else if (draw) {
      position.tiedMatches += 1;
      position.points += 1;
    } else {
      position.lostGames += 1;
    }

    position.gamesPlayed += 1;

    // Recalcular los atributos que necesitan sumas y restas
    const club = await db.Club.findByPk(clubId);
    position.goalsFor += club.score;
    position.goalsAgainst += club.scoreContraries;
    position.goalDifference = position.goalsFor - position.goalsAgainst;

    // Guardar los cambios en la tabla de posiciones
    await position.save();

    res.status(200).json({ success: true, message: 'Resultado del partido registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar el resultado del partido:', error);
    res.status(500).json({ success: false, message: 'Error al registrar el resultado del partido' });
  }
};

export default {
  registerMatchResult,
};
