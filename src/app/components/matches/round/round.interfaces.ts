import { AppStore } from './../../shared/app.store';
import { Round } from '../shared/matches.interfaces';

export interface RoundComponentProps {
    round: Round;
    appStore: AppStore;
}
