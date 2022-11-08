import React from "react";
import Cell from '../cell/Cell';
import { addPawn, addCastle, addKnight, addBishop, addQueen } from "../../reducers/piecesSlice";
import { useDispatch } from "react-redux";



const Board  = () => {
    const arr = [];
    const dispatch = useDispatch();
    const coords = [8,7,6,5,4,3,2,1];

    const dispatchPiece = (action, i, j, team) => {
        dispatch(action({coords: [coords[i], coords[j]], team: team, id: `${coords[i]}` + coords[j]}))
    }


    for (let i = 0; i < coords.length; i++) {
        for(let j = 7; j >= 0; j--){
            if(i === 1 ) { 
                dispatchPiece(addPawn, i, j, 'black');
            } else if (i === 6) {
                dispatchPiece(addPawn, i, j, 'white');
            } else if (i === 0 && (j === 7 || j === 0)) {
                dispatchPiece(addCastle, i, j, 'black')
            } else if (i === 7 && (j === 7 || j === 0)) {
                dispatchPiece(addCastle, i, j, 'white')
            } else if (i === 0 && (j === 6 || j === 1)) {
                dispatchPiece(addKnight, i, j, 'black')
            } else if (i === 7 && (j === 6 || j === 1)) {
                dispatchPiece(addKnight, i, j, 'white')
            } else if (i === 0 && (j === 5 || j === 2)) {
                dispatchPiece(addBishop, i, j, 'black')
            } else if (i === 7 && (j === 5 || j === 2)) {
                dispatchPiece(addBishop, i, j, 'white')
            } else if(i === 7 && j === 4) {
                dispatchPiece(addQueen, i, j , 'white')
            } else if (i === 0 && j === 4) {
                dispatchPiece(addQueen, i, j, 'black')
            }
            arr.push({coords:[coords[i], coords[j]]})
        }
    }




    const createCellList = (arr) => {
        return arr.map((item, id) => {
            return <Cell 
            key={id} 
            props={{coords: item.coords, 
                    black:((item.coords[0] % 2 === 0 && item.coords[1] % 2 === 0) || 
                           (item.coords[0] % 2 !== 0 && item.coords[1] % 2 !== 0)) ? 'true' : false}}/>
        })
    }

    const cellList = createCellList(arr)

    return (
        <>
            <div className='board'>{cellList}</div>
        </>
    )
}

export default Board