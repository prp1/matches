export interface Match {
    date: string;
    score1: number;
    score2: 0;
    team1: Team;
    team2: Team;
    roundName: string;
}

export interface Team {
    code: string;
    key: string;
    name: string;
}

export interface GetMatchesApiResponseModel {
    name: string;
    matches: Match[];
    totalCount: number;
}

export interface GetTeamsApiResponseModel {
    teams: Team[];
}
