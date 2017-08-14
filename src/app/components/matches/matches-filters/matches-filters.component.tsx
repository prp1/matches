import * as React from 'react';
import { observer } from 'mobx-react';
import { MatchesFiltersComponentProps } from './matches-filters.interfaces';
import { Team } from '../shared/matches.interfaces';
import { scrollService } from '../../shared/scroll.service';
const styles = require('./matches-filters.styles');

@observer
export class MatchesFiltersComponent extends React.Component {

    public props: MatchesFiltersComponentProps;

    public componentDidMount(): void {
        this.props.appStore.loadTeams();
    }

    public render(): any {
        const appStore = this.props.appStore;

        const isChecked = (team: Team): boolean => {
            return appStore.teamsFilter.indexOf(team.key) > -1;
        };

        const handleFilterChange = (e: any): void => {
            const teamKey = e.target.value;

            if (e.target.checked) {
                appStore.addTeamToFilter(teamKey);
            } else {
                appStore.removeTeamFromFilter(teamKey);
            }

            appStore.loadMatches(true)
                .then(() => {
                    scrollService.scrollToTop(500);
                });
        };

        return (
            <div>
                {this.props.appStore.teams.map((team) => {
                    return (
                        <label className={styles.teamLabel} key={team.key}>
                            <input
                                type="checkbox"
                                className={styles.teamLabelCheckbox}
                                value={team.key}
                                onChange={handleFilterChange}
                            />
                            <span className={styles.teamLabelTitle}></span>
                            {team.name}
                        </label>
                    );
                })}
            </div>
        );
    }
}
