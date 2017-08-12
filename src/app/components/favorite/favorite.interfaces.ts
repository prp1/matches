import { Match } from './../Item/item.interfaces';
import { AppStore } from './../app/appStore';

export interface FavoriteComponentProps {
    appStore: AppStore;
    match: Match;
}