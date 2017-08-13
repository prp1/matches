import * as React from 'react'
import { observer } from "mobx-react";
import { AppStore } from "../shared/app.store";
import { NavComponent } from "../nav/nav.component";
import { MatchesListComponent } from "../matches/matches-list/matches-list.component";
const styles = require('./app.styles.scss');

const appStore = new AppStore();

export const AppComponent = observer(() => {
    return (
        <div>
            <NavComponent title={appStore.league}></NavComponent>
            <div className={styles.container}>
                <MatchesListComponent appStore={appStore} />
            </div>
        </div>
    )
});
