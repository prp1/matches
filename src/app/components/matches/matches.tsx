import * as React from 'react'
// import styles from './itemsList.scss'
const styles = require('./matches.scss');
import { AppStore } from '../app/appStore'
// import { matchesHoc } from '../matchesHoc/matchesHoc'
import { Match, GetMatchesApiResponseModel } from "../Item/item.interfaces";
import { observer } from "mobx-react";

@observer
export class Matches extends React.Component {

    public props: {
        appStore: AppStore;
    }

    componentDidMount(): void {
        fetch('/data')
            .then((response) => {
                return response.json()
            }).then((data: GetMatchesApiResponseModel) => {
                this.props.appStore.setLeague(data.name)
                this.props.appStore.setRounds(data.rounds)
            }).catch((ex) => {
                console.log('parsing failed', ex)
            })
    }

    render() {
        return (
            <div>
                <h1 className={styles.leagueTitle}>{this.props.appStore.league}</h1>

                <ul>
                    {this.props.appStore.rounds.map((round) => {
                        return (
                            <li className={styles.round} key={round.name}>
                                <h2 className={styles.roundTitle}>{round.name}</h2>
                                <ul>
                                    {round.matches.map((match) => {
                                        return (
                                            <li className={styles.match} key={match.date + match.team1.key + match.team2.key}>
                                                {match.team1.name} {match.score1} : {match.score2} {match.team2.name} <br />
                                                <div className={styles.info}>{match.date}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>


            </div>
        )
    }
}

// // const Matches = (props: {appStore: AppStore}) => {
// const Matches = observer((props: { appStore: AppStore, matches: Match[] }) => {

//     // const matches = props.matches;
//     const matches = appStore.matches;

//     return (
//         <ul className={styles.list}>
//             ppppppppppppppp
//             {matches.map((match) => {
//                 return (
//                     <li className={styles.item} key={match.id}>
//                         {match.title}
//                     </li>
//                 )
//             })}
//         </ul>
//     )
// });