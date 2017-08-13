import { Match } from './matches.interfaces';

export const matchesService = {

    getMatchKey: (match: Match): string => {
        return match.date + match.team1.key + match.team2.key;
    },

};
