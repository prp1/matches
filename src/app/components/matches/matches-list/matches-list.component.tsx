import * as React from 'react';
import { observer } from 'mobx-react';
import { MatchesListComponentProps } from './matches-list.interfaces';
import { MatchComponent } from '../match/match.component';
import { matchesService } from '../shared/matches.service';
const InfiniteScroll = require('react-infinite-scroller');

@observer
export class MatchesListComponent extends React.Component {

    public props: MatchesListComponentProps;

    public componentDidMount(): void {
        this.props.appStore.loadFavoriteMatches();
    }

    public loadMoreMatches = (): void => {
        this.props.appStore.loadMatches(false);
    }

    public render(): any {
        const appStore = this.props.appStore;
        const matches = appStore.matches;

        const getPreviousMatchRoundName = (index: number): string => {
            return matches[index - 1] && matches[index - 1].roundName;
        };

        return (
            <InfiniteScroll
                loadMore={this.loadMoreMatches}
                hasMore={appStore.hasMoreMatches}
                loader={<div>Loading...</div>}
            >
                <ul>
                    {matches.map((match, i) => {
                        const key = matchesService.getMatchKey(match);
                        return (
                            <MatchComponent
                                match={match}
                                previousMatchRoundName={getPreviousMatchRoundName(i)}
                                appStore={appStore}
                                key={key}
                            >
                            </MatchComponent>
                        );
                    })}
                </ul>
            </InfiniteScroll>
        );
    }
}
