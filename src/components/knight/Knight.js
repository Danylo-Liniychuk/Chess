import React from "react";
import blackKnight from '../../assets/blackKnight.svg';
import whiteKnight from '../../assets/whiteKnight.svg';
import {bindActivePiece} from "../../reducers/activeSlice";
import { useDispatch, useSelector} from "react-redux";

const Knight= ({props}) => {
    const dispatch = useDispatch();
    let {coords, team} = props;
    const activeTeam = useSelector(state => state.cells.activeTeam)

    const onCastleDrag = () => {
        let moveArr = [], captureArr
    }
    return(
        <>
            <img className="piece__castle" src={(team === 'white') ? whiteKnight : blackKnight} 
                 alt="castle"></img>
        </>
    )
}

export default Knight;