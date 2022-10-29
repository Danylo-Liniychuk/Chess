import { createSlice, createSelector } from "@reduxjs/toolkit";



const initialState = {
    cells: [],
    activePiece: {}
}


const cellsSlice  = createSlice({
    name: 'cells',
    initialState,
    reducers: {
        createCellsArr : (state, action) => {
            state.cells.push(action.payload)
        },
        vacantCell : (state, action) => {
            state.cells.forEach(item => {
                if(item.coords[0] === action.payload[0] && item.coords[1] === action.payload[1]) {
                    item.vacant = !item.vacant;
                }
            })
        },
        bindActivePiece: (state, action) => {
            state.activePiece = {coords:action.payload.coords, piece: action.payload.piece}
        }
    }
})


export const activePieceSelector = createSelector(
    (state) => state.cells,
    (state) => state.activePiece,
    (cells, active) =>{
        switch (active.piece) {
            case 'pawn':
                return cells.filter(item => (active.coords[1] ===  cells.coords[1]) && 
                                    (cells.coords[0] - active.coords[0] === 1 || 
                                    cells.coords[0] - active.coords[0] === 2))
            default:    
                return null
        }
    }
)

const {actions, reducer} = cellsSlice;

export default reducer;
export const {createCellsArr, vacantCell, bindActivePiece} = actions;