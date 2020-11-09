import { getControlledCells, isSameCoords } from '../helpers';
import { Cell } from '../types';
import { ActionTypes, Actions } from './actions';
import { StateType } from './initialState';

const reducer = (state: StateType, action: Actions): StateType => {
    const { allCells, selectedCell } = state;

    switch(action.type) {
        case ActionTypes.SELECT_FIGURE:
            return {
                ...state,
                selectedCell: action.cell
            }

        case ActionTypes.SET_FIGURE:
            if(!action.cell || !selectedCell) {
                return state;
            }

            if(!isSameCoords(action.cell.coords, selectedCell.coords) && selectedCell.index) {
                allCells[selectedCell.index].figure = null;
            }

            allCells[action.cell.index] = action.cell;
            allCells.forEach((cell: Cell) => {
                if(cell.figure?.control) {
                    cell.figure.control = getControlledCells(cell.figure.type, cell.coords, allCells)
                }
            });

            return {
                ...state,
                allCells: allCells,
                selectedCell: null
            }

        default:
            throw new Error('Unknown action: ' + action);
    }
}

export default reducer;
