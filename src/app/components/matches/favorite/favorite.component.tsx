import * as React from 'react'
import { FavoriteComponentProps } from "./favorite.interfaces";
import { observer } from "mobx-react";
import { IconComponent } from "../../icon/icon.component";
import { heart } from "../../icon/icon.constants";
const styles = require('./favorite.styles.scss');

export const FavoriteComponent = observer((props: FavoriteComponentProps) => {
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
                <IconComponent path={heart} fill={getColor()}></IconComponent>
            </a>
        </div>
    );
});
