const express = require('express');
const browseRouter = express.Router();
const cachedData = require('../data/matches.json');
cachedData.rounds.reverse();


const getNormalizedMatches = (rounds) => {
    let normalizedData = [];

    rounds.forEach((round) => {
        round.matches.forEach((match) => {
            match.roundName = round.name;
            normalizedData.push(match);
        })
    });

    return normalizedData;
};

const cachedMatches = getNormalizedMatches(cachedData.rounds);


const getMatches = (payload) => {
    const offset = Number.parseInt(payload.offset) || 0;
    const limit = Number.parseInt(payload.limit) || 30;
    const teamsFilter = payload.teams ? payload.teams.split(',') : null;
    let matches = [].concat(cachedMatches);

    const teamIsInFilter = (team) => {
        return teamsFilter.some((t) => {
            return t === team.key;
        });
    };

    if (teamsFilter) {
        matches = matches.filter((match) => {
            return teamIsInFilter(match.team1) || teamIsInFilter(match.team2);
        });
    }

    matches = matches.slice(offset, offset + limit);

    return {
        name: cachedData.name,
        totalCount: cachedMatches.length,
        matches,
    };
};

const getTeams = () => {

    const teams = [];

    const teamExists = (team) => {
        return teams.some((t) => {
            return t.key === team.key;
        });
    };

    cachedData.rounds.forEach((round) => {
        round.matches.forEach((match) => {
            if (!teamExists(match.team1)) {
                teams.push(match.team1);
            }
            if (!teamExists(match.team2)) {
                teams.push(match.team2);
            }
        });
    });

    return teams;
};

browseRouter.get('', (req, res) => {
    res.render('home');
});

browseRouter.get('/matches', (req, res)=>{
    const response = getMatches(req.query);
    res.status(200).json(response);
});

browseRouter.get('/teams', (req, res)=>{
    const response = {
        teams: getTeams(),
    };
    res.status(200).json(response);
});

module.exports = browseRouter;
