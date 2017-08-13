import * as React from 'react';
import { observer } from 'mobx-react';
import { MatchComponentProps } from './match.interfaces';
import { FavoriteComponent } from '../favorite/favorite.component';
const InfiniteScroll = require('react-infinite-scroller');
const styles = require('./match.styles.scss');

export const MatchComponent = observer((props: MatchComponentProps) => {

    const appStore = props.appStore;
    const match = props.match;

    return (
        <li className={styles.match}>
            <div className={styles.left}>
                {match.team1.name} {match.score1} : {match.score2} {match.team2.name} <br />
                <div className={styles.info}>{match.date}</div>
            </div>
            <div className={styles.right}>
                <FavoriteComponent appStore={appStore} match={match}></FavoriteComponent>
            </div>
        </li>
    );

});
