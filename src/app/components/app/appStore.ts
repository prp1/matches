import { Round } from './../Item/item.interfaces';
import { observable } from 'mobx';
import { Match } from "../Item/item.interfaces";

export class AppStore {

    @observable
    public league: string = '';

    @observable
    public rounds: Round[] = [];

    public setLeague = (league: string) => {
        this.league = league;
    }

    public setRounds = (rounds: Round[]) => {
        console.log('aaa')
        console.log(rounds)
        this.rounds = rounds;
    }

}
