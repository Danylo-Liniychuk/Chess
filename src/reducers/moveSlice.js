import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    pawns: {},
    activeTeam: 'white',
}


const cellsSlice  = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        addPawns : (state, action) => {
            state.pawns[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        bindActivePiece: (state, action) => {
            if(action.payload !== false){
                state.activePiece = {coords:action.payload.coords, piece: action.payload.piece, variants:action.payload.varArr, team: action.payload.team}
            } else {
                delete state.activePiece
            }
            
        },
        changePieceCoords: (state, action) => {
            delete state.pawns[action.payload.id];
            state.pawns[`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team}
        },
        bindActiveTeam: (state, action) => {
            state.activeTeam = action.payload;
        } 
    }
})

// const getCells = (state) => state.cells;
// const getActiveItem = (state) => state.activePiece;


// export const activePieceSelector = createSelector(
//     [ getCells, getActiveItem ],
//     (cells, active) => {
//         switch (active.piece) {
//             case 'pawn':
//                 return cells.filter(item => (active.coords[1] ===  cells.coords[1]) && 
//                                     (cells.coords[0] - active.coords[0] === 1 || 
//                                      cells.coords[0] - active.coords[0] === 2))
//             default:
//                 return null
//         }
//     }
// );

const {actions, reducer} = cellsSlice;

export default reducer;
export const {addPawns, bindActivePiece, changePieceCoords, bindActiveTeam} = actions;