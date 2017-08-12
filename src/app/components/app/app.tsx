import * as React from 'react'
import { AppStore } from './AppStore';
import { Nav } from "../nav/nav";
import { Matches } from "../matches/matches";
const styles = require('./app.scss');

const appStore = new AppStore();

const App = () => {
    return (
        <div>
            <Nav></Nav>
            <div className={styles.container}>
                <Matches appStore={appStore} />
            </div>
        </div>
    )
};

// App.propTypes = { children: React.PropTypes.object };

export default App;