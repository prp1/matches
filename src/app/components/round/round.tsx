import * as React from 'react'
import { AppStore } from '../app/appStore'
import { observer } from "mobx-react";
import { RoundComponentProps } from "./round.interfaces";
import { MatchComponent } from "../match/match";
const styles = require('./round.scss');

export const RoundComponent = observer((props: RoundComponentProps) => {

    const appStore = props.appStore;
    const round = props.round;

    return (
        <li key={round.name}>
            <h2 className={styles.roundTitle}>{round.name}</h2>
            <ul className={styles.round}>
                {round.matches.map((match) => {
                    return <MatchComponent match={match} appStore={appStore}></MatchComponent>
                })}
            </ul>
        </li>
    )
});
