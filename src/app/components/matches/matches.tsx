import * as React from 'react'
const styles = require('./matches.scss');
import { AppStore } from '../app/appStore'
import { Match, GetRoundsApiResponseModel } from "../Item/item.interfaces";
import { observer } from "mobx-react";
import { heart } from "../icon/icons";
import { Icon } from "../icon/icon";
import { getMatchKey } from "./matches.helper";
import { Favorite } from "../favorite/favorite";
const InfiniteScroll = require("react-infinite-scroller");

@observer
export class Matches extends React.Component {

    public props: {
        appStore: AppStore;
    }

    componentDidMount(): void {
        this.props.appStore.loadFavoriteMatches();
    }

    loadMoreRounds = (): void => {
        this.props.appStore.loadRounds();
    }

    render() {
        const appStore = this.props.appStore;

        return (
            <div>
                <h1 className={styles.leagueTitle}>{appStore.league}</h1>

                <InfiniteScroll
                    loadMore={this.loadMoreRounds}
                    hasMore={appStore.hasMoreRounds}
                    loader={<div>Loading...</div>}
                >
                    <ul>
                        {appStore.rounds.map((round) => {
                            return (
                                <li className={styles.round} key={round.name}>
                                    <h2 className={styles.roundTitle}>{round.name}</h2>
                                    <ul>
                                        {round.matches.map((match) => {
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
                                        })}
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </InfiniteScroll>

            </div>
        )
    }
}
