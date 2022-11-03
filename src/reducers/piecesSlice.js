import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pawns: {},
    castles: {},
    knights: {},
}

const piecesSlice = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        addPawn : (state, action) => {
            state.pawns[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        changePawnCoords: (state, action) => {
            delete state.pawns[action.payload.id];
            state.pawns[`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team}
        },
        addCastle: (state, action) => {
            state.castles[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        addKnight: (state, action) => {
            state.knights[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        changeCastleCoords : (state, action) => {
            delete state.castles[action.payload.id];
            state.castles[`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team}
        }
    }
})

const {actions, reducer} = piecesSlice;

export default reducer;
export const {
    addPawn,
    addCastle,
    addKnight,
    changeCastleCoords,
    changePawnCoords
} = actions