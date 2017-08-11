import { Round } from './../Item/item.interfaces';
import { observable } from 'mobx';
import { Match } from "../Item/item.interfaces";

export class AppStore {

    @observable
    public matches: Match[] = [];

    @observable
    public rounds: Round[] = [];

    public setMatches = (matches: Match[]) => {
        this.matches = matches;
    }

    public setRounds = (rounds: Round[]) => {
        console.log('aaa')
        console.log(rounds)
        this.rounds = rounds;
    }

}
