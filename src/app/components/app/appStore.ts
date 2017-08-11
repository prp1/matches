import { observable } from 'mobx';
import { Match } from "../Item/item.interfaces";

export class AppStore {

    @observable
    public matches: Match[] = [];

    public setMatches = (matches: Match[]) => {
        this.matches = matches;
    }

}
