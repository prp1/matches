import { Match } from './../shared/matches.interfaces';
import { AppStore } from './../../shared/app.store';

export interface FavoriteComponentProps {
    appStore: AppStore;
    match: Match;
}
