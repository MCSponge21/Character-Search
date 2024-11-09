const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function getLeaderboard(gameId){
    const leaderboard = await prisma.leaderboard.findMany({
        where: {
            gameId: parseInt(gameId)
        },
        orderBy: {
            time: 'asc'
        }
    })
    return leaderboard;
}

async function addToLeaderboard(gameId, username, time){
    const entry = await prisma.leaderboard.create({
        data :{
            gameId: parseInt(gameId),
            time: time,
            username: username
        }
    })
    return entry;
}

module.exports = {
    getLeaderboard,
    addToLeaderboard
}