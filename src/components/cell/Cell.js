import React from "react";
import Pawn from "../pawn/Pawn";
import {useDispatch ,useSelector } from "react-redux";
import { changePieceCoords, bindActivePiece, bindActiveTeam } from "../../reducers/moveSlice";



const Cell = ({props}) => {
    const black = props.black,
          coords = props.coords;
    
    const dispatch = useDispatch();
    const pawns = useSelector(state => state.cells.pawns?.[`${coords[0]}` + coords[1]]);
    const active = useSelector(state => state.cells.activePiece);
    const secondCell = useSelector(state => state.cells.pawns?.[`${active?.variants[0][0]}` + active?.variants[0][1]]);

    const onDragOver = (e) => {
        e.preventDefault();

    }

    const onDropElement = () => {
        if(status && !pawns && !secondCell) {
            console.log(pawns);
            console.log(secondCell);
            dispatch(changePieceCoords({new: coords, id: `${active.coords[0]}` + active.coords[1], team: active.team}));
            dispatch(bindActiveTeam((active.team === 'white') ? "black" : "white"))
            dispatch(bindActivePiece(false))
        }
    }

    const isEqual = (arr1, arr2) => {
        let status = false;
        arr2.forEach(item => {
            if(item[0] === arr1[0] && item[1] === arr1[1]) {
                status = true
            }
        })
        return status
    }
    const status = (!active) ? false : isEqual(coords, active.variants);
    return (
        <>
            <div onDragOver={onDragOver} onDrop={onDropElement} className={(black) ? "board__cell-black" : "board__cell"}>
                {(pawns) ? <Pawn props={{coords: pawns.coords, team: pawns.team}}/> : null}
                {(status && !pawns && !secondCell ) ? <div className="board__cell-variant"></div> : null }
            </div>
        </>
    )
}

export default Cell