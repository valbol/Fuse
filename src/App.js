import React, { useState } from 'react';

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import UserTokens from './user/pages/UserTokens';
import TokenDetails from './tokens/components/TokenDetails';
const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/:userId/tokens' exact>
                    <UserTokens />;
                </Route>
                <Route
                    path='/details/:contract'
                    exact
                    component={TokenDetails}></Route>
                <Redirect to='/' />
            </Switch>
        </Router>
    );
};

export default App;
