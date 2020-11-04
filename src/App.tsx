import React, { ReactElement } from 'react';

import { Board } from './components/Board/Board';

export const App = ():ReactElement => {
    return (
        <div>
            <Board />
        </div>
    );
}