const express = require('express');
const Router = express.Router();
const {getLeaderboardController, postLeaderboardController} = require('../controller/controller')

Router.get('/leaderboard/:gameId', getLeaderboardController);
Router.post('/leaderboard/:gameId', postLeaderboardController);

module.exports = Router;