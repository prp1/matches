import { Match } from './../Item/item.interfaces';
import { AppStore } from './../app/appStore';

export interface MatchComponentProps {
    match: Match;
    appStore: AppStore;
}
