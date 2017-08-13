import { matchesService } from './../matches/shared/matches.service';
import { apiService } from './api.service';
import { GetMatchesApiResponseModel } from '../matches/shared/matches.interfaces';
import { Match, Team, GetTeamsApiResponseModel } from './../matches/shared/matches.interfaces';
import { observable, computed, action, useStrict } from 'mobx';

useStrict(true);

export class AppStore {

    @computed
    public get league(): string {
        return this._league;
    }

    @computed
    public get teams(): Team[] {
        return this._teams;
    }

    @computed
    public get teamsFilter(): string[] {
        return this._teamsFilter;
    }

    @computed
    public get matches(): Match[] {
        return this._matches;
    }

    @computed
    public get hasMoreMatches(): boolean {
        return this._hasMoreMatches;
    }

    @observable
    private _league: string = '';

    @observable
    private _teams: Team[] = [];

    @observable
    private _teamsFilter: string[] = [];

    @observable
    private _matches: Match[] = [];

    @observable
    private _matchesOffset: number = 0;

    @observable
    private _hasMoreMatches: boolean = true;

    @observable
    private _favoriteMatches: string[] = [];

    public isMatchFavorite(match: Match): boolean {
        const key = matchesService.getMatchKey(match);
        return this._favoriteMatches.indexOf(key) > -1;
    }

    @action
    public toggleMatchFavoriteStatus(match: Match): void {
        const key = matchesService.getMatchKey(match);

        if (this.isMatchFavorite(match)) {
            const newMatches = this._favoriteMatches.filter((matchKey) => {
                return matchKey !== key;
            });

            this._favoriteMatches = newMatches;
        } else {
            this._favoriteMatches.push(key);
        }

        localStorage.setItem('favoriteMatches', JSON.stringify(this._favoriteMatches));
    }

    @action
    public loadMatches(shouldResetOffset: boolean): void {
        if (shouldResetOffset) {
            this._matchesOffset = 0;
        }

        const limit = 30;
        const offset = this._matchesOffset;
        let url = `/matches?offset=${offset}&limit=${limit}`;

        if (this._teamsFilter.length) {
            url += `&teams=${this._teamsFilter.join(',')}`;
        }

        apiService.get(url)
            .then(action((data: GetMatchesApiResponseModel) => {
                if (shouldResetOffset) {
                    this._matches = [];
                }

                this._matches = this._matches.concat(data.matches);
                this._league = data.name;
                this._matchesOffset += limit;
                this._hasMoreMatches = this._matchesOffset < data.totalCount;
            }));
    }

    @action
    public loadTeams(): void {
        apiService.get(`/teams`)
            .then(action((data: GetTeamsApiResponseModel) => {
                this._teams = data.teams;
            }));
    }

    @action
    public loadFavoriteMatches(): void {
        const storedMatches = localStorage.getItem('favoriteMatches');
        const parsedMatches = storedMatches ? JSON.parse(storedMatches) : [];
        this._favoriteMatches = parsedMatches;
    }

    @action
    public addTeamToFilter(teamKey: string): void {
        this._teamsFilter.push(teamKey);

    }

    @action
    public removeTeamFromFilter(teamKey: string): void {
        this._teamsFilter.splice(this._teamsFilter.indexOf(teamKey), 1);
    }

}
