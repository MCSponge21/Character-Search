const {addToLeaderboard, getLeaderboard} = require('../prisma/query');

async function getLeaderboardController(req, res, err){
    console.log(req.params.gameId);
    const leaderboard = await getLeaderboard(req.params.gameId);
    res.json(leaderboard);
}

async function postLeaderboardController(req, res, err){
    const leaderboard = await addToLeaderboard(req.params.gameId, req.body.username, req.body.timer);
    res.json(leaderboard);
}

module.exports = {
    getLeaderboardController, postLeaderboardController
}