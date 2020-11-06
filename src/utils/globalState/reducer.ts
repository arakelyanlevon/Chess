import { act } from 'react-dom/test-utils';
import { Cell } from '../types';
import { ActionTypes, Actions } from './actions';
import { StateType } from './initialState';

const reducer = (state: StateType, action: Actions): StateType => {
    const { allCells } = state;

    switch(action.type) {
        case ActionTypes.SELECT_FIGURE:

            if(action.index === -1) {
                return state;
            }

            return {
                ...state,
                allCells: allCells.map((cell: Cell, i: number) => {
                    return {
                        coords: cell.coords,
                        color: cell.color,
                        figure: cell.figure,
                        selected: i === action.index,
                        index: cell.index
                    };
                })
            }
        case ActionTypes.SET_FIGURE:

            if(
                !action.figure ||
                action.newIndex === action.oldIndex ||
                action.newIndex === -1 ||
                action.oldIndex === -1
            ) {
                return state;
            }

            return {
                ...state,
                allCells: allCells.map((cell: Cell, i: number) => {
                    return {
                        coords: cell.coords,
                        color: cell.color,
                        figure: i === action.newIndex ? action.figure : (cell.selected ? null : cell.figure),
                        selected: false,
                        index: cell.index
                    };
    
                })
            }
            

        default:
            throw new Error('Unknown action: ' + action);
    }
}

export default reducer;
