import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { TokenProvider } from './contexts/Token.context';
import { Loading } from './components/Loading';

function wrapComponent<T extends React.FC>(component: T) {
    return { default: component };
}

// note this has the downside of losing some type information at the the cost of being lazy when typing
// pages DO NOT take props so this really shouldnt matter
// if we need the type information just replace this with a hardcoded statement with pageName being part of the literal
// and the module being indexed using the . operator
function lazyPage(pageName: string) {
    return React.lazy(() => import(`./pages/${pageName}`).then((module) => wrapComponent(module[pageName])));
}

const Login = lazyPage('Login');
const CreationPrompt = lazyPage('CreationPrompt');
const Main = lazyPage('Main');

export const App: React.FC = () => {
    return (
        <TokenProvider>
            <Suspense fallback={Loading}>
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
            </Suspense>
        </TokenProvider>
    );
};
