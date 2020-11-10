import React from 'react';

import { Board } from './components/Game/Board/Board';
// import { useGlobalState } from './utils/globalState/useGlobalState';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export const App = () => {
    return <Board/>
    // const { state } = useGlobalState();
    // console.log(state)
    // return (
    //     <div>
    //         <Board />
    //     </div>
    // );
    // return <Router>
    //     <div>
    //         <nav>
    //             <ul>
    //                 <li>
    //                     <Link to="/">Home</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="/board">Board</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="/users">Users</Link>
    //                 </li>
    //             </ul>
    //         </nav>

    //         <Switch>
    //             <Route path="/board">
    //                 <Board />
    //             </Route>
    //         </Switch>
    //     </div>
    // </Router>
}