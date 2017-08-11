import * as React from 'react'
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../components/App/App'

render(
    (<App></App>), document.getElementById('root')
);

// render(
//     (<Router>
//         <App>
//             aaa<br />
//         </App>

//     </Router>), document.getElementById('root')
// );
