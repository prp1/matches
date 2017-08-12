import * as React from 'react'
import { FavoriteComponentProps } from "./favorite.interfaces";
import { Icon } from "../icon/icon";
import { heart } from "../icon/icons";
import { observer } from "mobx-react";
const styles = require('./favorite.scss');

export const Favorite = observer((props: FavoriteComponentProps) => {
    const { appStore, match } = props;
    const isFavorite = appStore.isMatchFavorite

    const getColor = (): string => {
        return appStore.isMatchFavorite(match)
            ? 'red'
            : '#ccc';
    };

    const onClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        appStore.toggleMatchFavoriteStatus(match);
    };

    return (
        <div>
            <a href="#" className={styles.anchor} onClick={onClick}>
                <Icon path={heart} fill={getColor()}></Icon>
            </a>
        </div>
    );
});
