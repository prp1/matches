import * as React from 'react'
// import styles from './itemsList.scss'
const styles = require('./matches.scss');
import { AppStore } from '../app/appStore'
// import { matchesHoc } from '../matchesHoc/matchesHoc'
import { Match, GetMatchesApiResponseModel } from "../Item/item.interfaces";
import { observer } from "mobx-react";



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

@observer
class Matches extends React.Component {

    public props: {
        appStore: AppStore;
    }

    componentDidMount(): void {
        console.log(this.props.appStore.matches)

        fetch('/data')
            .then((response) => {
                return response.json()
            }).then((data: GetMatchesApiResponseModel) => {
                console.log(data.rounds[0].matches)
                this.props.appStore.setMatches(data.rounds[0].matches)
            }).catch((ex) => {
                console.log('parsing failed', ex)
            })
    }

    render() {
        return (
            <div>
                gethe
                <ul>
                    {this.props.appStore.matches.map((match, i) => {
                        return (
                            <li className={styles.item} key={match.date + match.team1.key + match.team2.key}>
                                {match.team1.name} {match.score1} : {match.score2} {match.team2.name} <br/>
                                Date: {match.date}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Matches;