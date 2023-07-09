import db from "@/database/models";

export default async function handler(req, res) {
  try {
    const { leagueId } = req.query;
    const positionTable = await db.PositionTableLeague.findAll({
      where: { leagueId },
      include: [
        {
          model: db.Club,
          as: 'club',
        },
      ],
      order: [['points', 'DESC']],
    });

    const results = positionTable.map((position) => ({
      id: position.id,
      matchesWon: position.matchesWon,
      tiedMatches: position.tiedMatches,
      //lostGames: position.lostGames,
      //gamesPlayed: position.gamesPlayed,
      gf: position.gf,
      gc: position.gc,
      dif: position.gf - position.gc,
      points: position.points,
      clubId: position.clubId,
      leagueId: position.leagueId,
      clubName: position.club.name,
    }));

    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Error al obtener los resultados de la tabla de posiciones',
    });
  }
}
