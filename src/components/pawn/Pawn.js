import React from "react";
import { useEffect } from "react";
import blackPawn from '../../assets/blackPawn.svg';
import whitePawn from '../../assets/whitePawn.svg';
import {bindActivePiece} from "../../reducers/moveSlice";
import { useDispatch, useSelector} from "react-redux";

const Pawn = ({props}) => {
    const dispatch = useDispatch();
    let {coords, team} = props;
    const activeTeam = useSelector(state => state.cells.activeTeam)
    // useEffect(() => {
    //     dispatch(addVacantCell({coords, id: `${coords[0]}` + coords[1]}))
    // }, [coords])

    const onPawnDrag = () => {
        let varArr
        if (team === 'white' && coords[0] === 2){
            varArr = [[coords[0] + 1, coords[1]], [coords[0] + 2, coords[1]]]
        } else if ( team === 'black' && coords[0] === 7) {
            varArr = [[coords[0] - 1, coords[1]], [coords[0] - 2, coords[1]]]
        } else if ( team === 'white') {
            varArr = [[coords[0] + 1, coords[1]]]
        } else {
            varArr = [[coords[0] - 1, coords[1]]]
        }
        dispatch(bindActivePiece({coords:coords, piece: "pawn", varArr, team}));
    }
    const onDragEnd = () => {
        dispatch(bindActivePiece(false))
    }
    return(
        <>
            <img onDragEnd={onDragEnd}
                 onDragStart={(team === activeTeam) ? onPawnDrag : null}
                 draggable={(team === activeTeam)? true : false}
                 className="piece" src={(team === 'white') ? whitePawn : blackPawn} 
                 alt="black-pawn"></img>
        </>
    )
}

export default Pawn