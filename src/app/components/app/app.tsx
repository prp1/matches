import * as React from 'react'
import { AppStore } from './AppStore';
import { Nav } from "../nav/nav";
import { Matches } from "../matches/matches";
import { observer } from "mobx-react";
const styles = require('./app.scss');

const appStore = new AppStore();

const App = observer(() => {
    return (
        <div>
            <Nav title={appStore.league}></Nav>
            <div className={styles.container}>
                <Matches appStore={appStore} />
            </div>
        </div>
    )
});

// App.propTypes = { children: React.PropTypes.object };

export default App;