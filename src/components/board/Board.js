import React from "react";
import {useDispatch}  from 'react-redux';
import { createCellsArr } from "../../reducers/moveSlice";
import Cell from '../cell/Cell';



const Board  = () => {

    const dispatch = useDispatch();
    const arr = [];
    const coords = [8,7,6,5,4,3,2,1];
    for (let i = 0; i < coords.length; i++) {
        for(let j = 7; j >= 0; j--){
            dispatch(createCellsArr({coords:[coords[i], coords[j]], vacant: false, id :`${coords[i]}` + coords[j]}));
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