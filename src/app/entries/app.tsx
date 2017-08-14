require('promise-polyfill');
import 'whatwg-fetch';
import * as React from 'react';
import { render } from 'react-dom';
import { AppComponent } from '../components/app/app.component';

render(
    (<AppComponent></AppComponent>), document.getElementById('root'),
);
