const express = require('express');
const browseRouter = express.Router();
const data = require('../data/matches.json');
data.rounds.reverse();

const getItems = (payload) => {
    const offset = Number.parseInt(payload.offset) || 0;
    const limit = Number.parseInt(payload.limit) || 5;
    return {
        name: data.name,
        totalCount: data.length,
        rounds: data.rounds.slice(offset, offset + limit),
    };
};

browseRouter.get('', (req, res) => {
    const response = getItems(req.query);
    res.render('home', response);
});

browseRouter.get('/rounds', (req, res)=>{
    const response = getItems(req.query);
    res.status(200).json(response);
});

module.exports = browseRouter;
