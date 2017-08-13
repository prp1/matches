import * as React from 'react'
import { AppStore } from '../app/appStore'
import { observer } from "mobx-react";
import { RoundComponent } from "../round/round";
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
            <InfiniteScroll
                loadMore={this.loadMoreRounds}
                hasMore={appStore.hasMoreRounds}
                loader={<div>Loading...</div>}
            >
                <ul>
                    {appStore.rounds.map((round) => {
                        return (
                            <RoundComponent round={round} appStore={appStore}></RoundComponent>
                        )
                    })}
                </ul>
            </InfiniteScroll>
        )
    }
}
