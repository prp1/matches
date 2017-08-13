import * as React from 'react'
import { AppStore } from '../app/appStore'
import { Match } from "../Item/item.interfaces";
import { observer } from "mobx-react";
import { Favorite } from "../favorite/favorite";
import { getMatchKey } from "../matches/matches.helper";
import { MatchComponentProps } from "./match.interfaces";
const InfiniteScroll = require("react-infinite-scroller");
const styles = require('./match.scss');

export const MatchComponent = observer((props: MatchComponentProps) => {

    const appStore = props.appStore;
    const match = props.match;

    return (
        <li className={styles.match} key={getMatchKey(match)}>
            <div className={styles.left}>
                {match.team1.name} {match.score1} : {match.score2} {match.team2.name} <br />
                <div className={styles.info}>{match.date}</div>
            </div>
            <div className={styles.right}>
                <Favorite appStore={appStore} match={match}></Favorite>
            </div>
        </li>
    )

});
