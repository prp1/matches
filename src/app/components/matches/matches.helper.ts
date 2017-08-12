import { Match } from './../Item/item.interfaces';

export const getMatchKey = (match: Match): string => {
    return match.date + match.team1.key + match.team2.key;
}
