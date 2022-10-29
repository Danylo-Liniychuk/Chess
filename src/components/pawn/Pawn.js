import React from "react";
import blackPawn from '../../assets/black-pawn.svg';
import { vacantCell, bindActivePiece } from "../../reducers/moveSlice";
import { activePieceSelector } from "../../reducers/moveSlice";
import { useDispatch } from "react-redux";

const Pawn = ({props}) => {
    const dispatch = useDispatch();
    const {coords} = props;
    dispatch(vacantCell(coords));
    

    const onPawnDrag = () => {
        dispatch(bindActivePiece({coords:coords, piece: "pawn"}));
        const active = activePieceSelector();
        console.log(active)
    }
    return(
        <>
            <img onDragStart={onPawnDrag} className="piece" src={blackPawn} alt="black-pawn"></img>
        </>
    )
}

export default Pawn