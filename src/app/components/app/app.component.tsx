import * as React from 'react';
import { observer } from 'mobx-react';
import { AppStore } from '../shared/app.store';
import { NavComponent } from '../nav/nav.component';
import { MatchesListComponent } from '../matches/matches-list/matches-list.component';
import { MatchesFiltersComponent } from '../matches/matches-filters/matches-filters.component';
const styles = require('./app.styles.scss');

const appStore = new AppStore();

export const AppComponent = observer(() => {
    return (
        <div>
            <NavComponent title={appStore.league}></NavComponent>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <MatchesFiltersComponent appStore={appStore} />
                </div>
                <div className={styles.content}>
                    <MatchesListComponent appStore={appStore} />
                </div>
            </div>
        </div>
    );
});
