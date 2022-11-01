import React from "react";
import Cell from '../cell/Cell';
import { addPawns } from "../../reducers/moveSlice";
import { useDispatch } from "react-redux";



const Board  = () => {
    const arr = [];
    const dispatch = useDispatch();
    const coords = [8,7,6,5,4,3,2,1];
    for (let i = 0; i < coords.length; i++) {
        for(let j = 7; j >= 0; j--){
            if(i === 1 ) { 
                dispatch(addPawns({coords: [coords[i], coords[j]], team: 'black', id: `${coords[i]}` + coords[j]}))
            } else if (i === 6) {
                dispatch(addPawns({coords: [coords[i], coords[j]], team: 'white', id: `${coords[i]}` + coords[j]}))
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