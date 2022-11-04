import React from "react";
import Pawn from "../pawn/Pawn";
import Castle from "../castle/Castle";
import Knight from "../knight/Knight";
import Bishop from '../bishop/Bishop';
import {useDispatch ,useSelector } from "react-redux";
import { deleteActivePiece, bindActiveTeam } from "../../reducers/activeSlice";
import { changePawnCoords, changeCastleCoords, changeKnightsCoords, capturePiece } from "../../reducers/piecesSlice";


const Cell = ({props}) => {
    const black = props.black,
          coords = props.coords;

    const dispatch = useDispatch();
    const pieces = useSelector(state => state.pieces);
    const active = useSelector(state => state.active.activePiece);


    const pieceTypeSearch = (id, obj, property) =>{
        let status = false;
            status = obj[property]?.[id];
        return status
    }

    const getCapturedData = (obj) => {
        for(let key in obj) {
            if(obj[key].hasOwnProperty(coordsConcat())) {
                return key;
            }
        }
    }


    function coordsConcat  () {
        return `${coords[0]}` + coords[1]
    }
    
    const dispatchMoveHelper = (activePiece) => {
        switch (activePiece.piece) {
            case 'pawns':
                dispatch(changePawnCoords({new: coords,
                                           id: `${activePiece.coords[0]}` + activePiece.coords[1],
                                           team: activePiece.team}));

                dispatch(bindActiveTeam((activePiece.team === 'white') ? "black" : "white"));
                dispatch(deleteActivePiece());
                break;
            case 'castles':
                dispatch(changeCastleCoords({new: coords,
                                             id: `${activePiece.coords[0]}` + activePiece.coords[1],
                                             team: activePiece.team}));

                dispatch(bindActiveTeam((activePiece.team === 'white') ? "black" : "white"));
                dispatch(deleteActivePiece());
                break
            case 'knights' :
                dispatch(changeKnightsCoords({new: coords,
                                             id: `${activePiece.coords[0]}` + activePiece.coords[1],
                                             team: activePiece.team}));
                dispatch(bindActiveTeam((activePiece.team === 'white') ? "black" : "white"));
                dispatch(deleteActivePiece());
                break
            default:
                break
        }
    }

    const dispatchCaptureHelper = (activePiece) => {
        dispatch(capturePiece({capturedType : getCapturedData(pieces),
            capturedId: coordsConcat(),
            invaderType: activePiece.piece,
            invaderId:  `${activePiece.coords[0]}` + activePiece.coords[1],
            new: coords,
            team: activePiece.team}))

        dispatch(bindActiveTeam((activePiece.team === 'white') ? "black" : "white"));
        dispatch(deleteActivePiece());
    }

    const onDragOver = (e) => {
        e.preventDefault();

    }

    const onDropElement = () => {
        if(canMove) {
            dispatchMoveHelper(active)
        } else if (canCapture){
            dispatchCaptureHelper(active)
        }
    }


    const isEqual = (arr1, arr2) => {
        let status = false;
        arr2.forEach(item => {
            if(item[0] === arr1[0] && item[1] === arr1[1]) {
                status = true;
            }
        })
        return status
    }

    const cellClassNameHelper = () => {
        if(black){
            if(canCapture){
                return 'board__cell-black board__cell-capture'
            } else {
                return 'board__cell-black'
            }
        } else {
            if (canCapture) {
                return 'board__cell board__cell-capture'
            } else {
                return 'board__cell'
            }
        }
    }

    const canMove = (active) ? isEqual(coords, active.variants) : false;
    const canCapture = (active) ? isEqual(coords, active.captures) : false;
    return (
        <>
            <div onDragOver={onDragOver}
                 onDrop={onDropElement}
                 className={cellClassNameHelper()}>
                {(pieceTypeSearch(coordsConcat(), pieces, 'pawns')) ? <Pawn props={{...pieceTypeSearch(coordsConcat(), pieces, 'pawns')}}/> : null}
                {(pieceTypeSearch(coordsConcat(), pieces, 'castles')) ? <Castle props={{...pieceTypeSearch(coordsConcat(), pieces, 'castles')}}/> : null}
                {(pieceTypeSearch(coordsConcat(), pieces, 'knights')) ? <Knight props={{...pieceTypeSearch(coordsConcat(), pieces, 'knights')}}/> : null}
                {(pieceTypeSearch(coordsConcat(), pieces, 'bishops')) ? <Bishop props={{...pieceTypeSearch(coordsConcat(), pieces, 'bishops')}}/> : null}
                {(canMove) ? <div className="board__cell-variant"></div> : null }
              
            </div>
        </>
    )
}

export default Cell