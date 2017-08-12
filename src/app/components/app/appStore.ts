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

    @observable
    private _league: string = '';

    @observable
    private _rounds: Round[] = [];

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
        apiHelper.get('/rounds')
            .then(action((data: GetRoundsApiResponseModel) => {
                this._rounds = data.rounds;
                this._league = data.name;
            }));
    }

    @action
    public loadFavoriteMatches(): void {
        const storedMatches = localStorage.getItem('favoriteMatches');
        const parsedMatches = storedMatches ? JSON.parse(storedMatches) : [];
        this._favoriteMatches = parsedMatches;
    }

}
