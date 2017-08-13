import * as React from 'react';
import { observer } from 'mobx-react';
import { RoundComponentProps } from './round.interfaces';
import { MatchComponent } from '../match/match.component';
import { matchesService } from '../shared/matches.service';
const styles = require('./round.styles.scss');

export const RoundComponent = observer((props: RoundComponentProps) => {

    const { appStore, round } = props;

    return (
        <li>
            <h2 className={styles.roundTitle}>{round.name}</h2>
            <ul className={styles.round}>
                {round.matches.map((match) => {
                    const key = matchesService.getMatchKey(match);
                    return (
                        <MatchComponent
                            match={match}
                            appStore={appStore}
                            key={key}
                        >
                        </MatchComponent>
                    );
                })}
            </ul>
        </li>
    );

});
