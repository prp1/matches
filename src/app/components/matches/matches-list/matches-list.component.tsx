import * as React from 'react'
import { observer } from "mobx-react";
import { MatchesListComponentProps } from "./matches-list.interfaces";
import { RoundComponent } from "../round/round.component";
const InfiniteScroll = require("react-infinite-scroller");

@observer
export class MatchesListComponent extends React.Component {

    public props: MatchesListComponentProps;

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