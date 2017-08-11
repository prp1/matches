import * as React from 'react'
import Matches from '../matches/matches';
import './app.scss'
import { AppStore } from './AppStore';

const appStore = new AppStore();

const App = () => {
    return (
        <div>
            <Matches appStore={appStore} />
        </div>
    )
};

// App.propTypes = { children: React.PropTypes.object };

export default App;