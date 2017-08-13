import { Round } from './../Item/item.interfaces';
import { AppStore } from './../app/appStore';

export interface RoundComponentProps {
    round: Round;
    appStore: AppStore;
}