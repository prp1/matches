import * as React from 'react';
import { observer } from 'mobx-react';
import { AppStore } from '../shared/app.store';
import { NavComponent } from '../nav/nav.component';
import { MatchesListComponent } from '../matches/matches-list/matches-list.component';
import { MatchesFiltersComponent } from '../matches/matches-filters/matches-filters.component';
import { StickyComponentProps } from './app.interfaces';
const { StickyContainer, Sticky } = require('react-sticky');
const styles = require('./app.styles.scss');
const appStore = new AppStore();

export const AppComponent = observer(() => {

    const stickySidebarFn = (props: StickyComponentProps) => {
        const style = props.calculatedHeight < window.innerHeight
            ? props.style
            : {};

        return (
            <div className={styles.sidebar} style={style}>
                <MatchesFiltersComponent appStore={appStore} />
            </div>
        );
    };

    return (
        <div>
            <NavComponent title={appStore.league}></NavComponent>

            <StickyContainer className={styles.container}>
                <Sticky disableCompensation={true}>
                    {stickySidebarFn}
                </Sticky>
                <div className={styles.content}>
                    <MatchesListComponent appStore={appStore} />
                </div>
            </StickyContainer>
        </div>
    );

});
