export interface Match {
    date: string;
    score1: number;
    score2: 0;
    team1: Team;
    team2: Team;
}

export interface Team {
    code: string;
    key: string;
    name: string;
}

export interface Round {
    name: string;
    matches: Match[];
}

export interface GetRoundsApiResponseModel {
    name: string;
    rounds: Round[];
    totalCount: number;
}
