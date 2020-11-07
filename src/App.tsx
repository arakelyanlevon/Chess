import React, { ReactElement } from 'react';

import { Board } from './components/Board/Board';
import { useGlobalState } from './utils/globalState/useGlobalState';

export const App = ():ReactElement => {
    const { state } = useGlobalState();
    console.log(state)
    return (
        <div>
            <Board />
        </div>
    );
}