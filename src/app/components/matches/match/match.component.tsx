import * as React from 'react';
import { observer } from 'mobx-react';
import { MatchComponentProps } from './match.interfaces';
import { FavoriteComponent } from '../favorite/favorite.component';
const InfiniteScroll = require('react-infinite-scroller');
const styles = require('./match.styles.scss');

export const MatchComponent = observer((props: MatchComponentProps) => {

    const appStore = props.appStore;
    const match = props.match;

    const doesNewRoundStart = match.roundName !== props.previousMatchRoundName;

    const roundName = doesNewRoundStart
        ? <h3 className={styles.roundName}>{match.roundName}</h3>
        : '';

    const getClassName = () => {
        let name = styles.match;

        if (doesNewRoundStart) {
            name += ` ${styles.matchFirstOfRound}`;
        }

        return name;
    };

    return (
        <li className={getClassName()}>

            {roundName}

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
