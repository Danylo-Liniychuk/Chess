import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    activeTeam: 'white',

}


const activeSlice  = createSlice({
    name: 'active',
    initialState,
    reducers: {
        bindActivePiece: (state, action) => {
            state.activePiece = {coords:action.payload.coords,
                                    piece: action.payload.piece,
                                    variants:action.payload.moveArr,
                                    team: action.payload.team,
                                    captures: action.payload.captureArr}

            
        },
        bindActiveTeam: (state, action) => {
            state.activeTeam = action.payload;
        },
        deleteActivePiece: (state) => {
            delete state.activePiece
        }
        }
    }
)



const {actions, reducer} = activeSlice;

export default reducer;
export const {
              bindActivePiece,
              bindActiveTeam,
              deleteActivePiece,} = actions;