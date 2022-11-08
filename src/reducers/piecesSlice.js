import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pawns: {},
    castles: {},
    knights: {},
    bishops: {},
    queens: {},
    kings: {}
}

const piecesSlice = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        addPawn : (state, action) => {
            state.pawns[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        addCastle: (state, action) => {
            state.castles[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        addKnight: (state, action) => {
            state.knights[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        addBishop: (state, action) => {
            state.bishops[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        addQueen: (state, action) => {
            state.queens[action.payload.id] = {coords: action.payload.coords, team: action.payload.team};
        },
        capturePiece : (state, action) => {
            delete state[action.payload.capturedType][action.payload.capturedId];
            delete state[action.payload.invaderType][action.payload.invaderId];
            state[action.payload.invaderType][`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team};
        },
        changePawnCoords: (state, action) => {
            delete state.pawns[action.payload.id];
            state.pawns[`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team}
        },
        changeCastleCoords : (state, action) => {
            delete state.castles[action.payload.id];
            state.castles[`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team}
        },
        changeKnightsCoords: (state, action) => {
            delete state.knights[action.payload.id];
            state.knights[`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team}
        },
        changeBishopsCoords: (state, action) => {
            delete state.bishops[action.payload.id];
            state.bishops[`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team}
        },
        changeQueensCoords: (state, action) => {
            delete state.queens[action.payload.id];
            state.queens[`${action.payload.new[0]}` + action.payload.new[1]] = {coords: action.payload.new, team: action.payload.team}
        },
}})

const {actions, reducer} = piecesSlice;

export default reducer;
export const {
    addPawn,
    addCastle,
    addKnight,
    addBishop,
    addQueen,
    changeCastleCoords,
    changePawnCoords,
    capturePiece,
    changeKnightsCoords,
    changeBishopsCoords,
    changeQueensCoords  } = actions