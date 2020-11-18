import React from 'react';
import { Board } from './components/Game/Board/Board';
import { Registration } from './components/Authorization/Registration/Registration';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export const App = () => {
    return <Router>
        <Route path='/login'>
            <Registration />
        </Route>
        <Route path='/game'>
            <Board />
        </Route>
    </Router>
}