import { apiHelper } from './../shared/api.helper';
import { getMatchKey } from './../matches/matches.helper';
import { Round, GetRoundsApiResponseModel } from './../Item/item.interfaces';
import { observable, computed, action, useStrict } from 'mobx';
import { Match } from "../Item/item.interfaces";

useStrict(true);

export class AppStore {

    @computed
    public get league(): string {
        return this._league;
    };

    @computed
    public get rounds(): Round[] {
        return this._rounds;
    }

    @computed
    public get hasMoreRounds(): boolean {
        return this._hasMoreRounds;
    }

    @observable
    private _league: string = '';

    @observable
    private _rounds: Round[] = [];

    @observable
    private _roundsOffset: number = 0;

    @observable
    private _hasMoreRounds: boolean = true;

    @observable
    private _favoriteMatches: string[] = [];

    isMatchFavorite(match: Match): boolean {
        return this._favoriteMatches.indexOf(getMatchKey(match)) > -1;
    }

    @action
    public toggleMatchFavoriteStatus(match: Match): void {
        const key = getMatchKey(match);

        if (this.isMatchFavorite(match)) {
            const newMatches = this._favoriteMatches.filter((matchKey) => {
                return matchKey !== key;
            });

            this._favoriteMatches = newMatches;
        } else {
            this._favoriteMatches.push(getMatchKey(match));
        }

        localStorage.setItem('favoriteMatches', JSON.stringify(this._favoriteMatches));
    }

    @action
    public loadRounds(): void {
        const limit = 5;
        const offset = this._roundsOffset;

        apiHelper.get(`/rounds?offset=${offset}&limit=${limit}`)
            .then(action((data: GetRoundsApiResponseModel) => {
                this._rounds = this._rounds.concat(data.rounds);
                this._league = data.name;
                this._roundsOffset += limit;
                this._hasMoreRounds = this._roundsOffset < data.totalCount;
            }));
    }

    @action
    public loadFavoriteMatches(): void {
        const storedMatches = localStorage.getItem('favoriteMatches');
        const parsedMatches = storedMatches ? JSON.parse(storedMatches) : [];
        this._favoriteMatches = parsedMatches;
    }

}
