import * as React from 'react';
import { observer } from 'mobx-react';
import { MatchesFiltersComponentProps } from './matches-filters.interfaces';
import { Team } from '../shared/matches.interfaces';
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

        const handleChange = (e: any): void => {
            const teamKey = e.target.value;

            if (e.target.checked) {
                appStore.addTeamToFilter(teamKey);
            } else {
                appStore.removeTeamFromFilter(teamKey);
            }

            appStore.loadMatches(true);
        };

        return (
            <div>
                {this.props.appStore.teams.map((team) => {
                    return (
                        <label className={styles.teamLabel} key={team.key}>
                            <input
                                type="checkbox"
                                value={team.key}
                                onChange={handleChange}

                            />
                            {team.name}
                        </label>
                    );
                })}
            </div>
        );
    }
}
