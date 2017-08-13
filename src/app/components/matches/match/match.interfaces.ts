import { AppStore } from './../../shared/app.store';
import { Match } from './../shared/matches.interfaces';

export interface MatchComponentProps {
    match: Match;
    previousMatchRoundName: string;
    appStore: AppStore;
}
