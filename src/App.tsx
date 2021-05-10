import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { TokenProvider } from './contexts/Token.context';
import { CreationPrompt } from './pages/CreationPrompt';

export const App: React.FC = () => {
    return (
        <TokenProvider>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/creationprompt">
                        <CreationPrompt />
                    </Route>
                    <Route path="/">
                        <Main />
                    </Route>
                </Switch>
            </Router>
        </TokenProvider>
    );
};
