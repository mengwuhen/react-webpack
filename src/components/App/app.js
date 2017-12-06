import React, {Component} from 'react';

import Nav from 'components/Nav/Nav.js';
import getRouter from 'router/router';

export default class App extends Component {
    render() {
        return (
            <div>
                <Nav/>
                {getRouter()}
            </div>
        )
    }
}