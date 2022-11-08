import React from "react";
import blackCastle from '../../assets/blackCastle.svg';
import whiteCastle from '../../assets/whiteCastle.svg';
import castleMoveHelper from "../../helpers/castleMoveHelper";
import {bindActivePiece, deleteActivePiece} from "../../reducers/activeSlice";
import { useDispatch, useSelector} from "react-redux";

const Castle = ({props}) => {
    const dispatch = useDispatch();
    let {coords, team} = props;
    const activeTeam = useSelector(state => state.active.activeTeam);
    const pieces = useSelector(state => state.pieces);

    const onCastleDrag = () => {
        const {moveArr, captureArr} = castleMoveHelper(coords, pieces, team)
        dispatch(bindActivePiece({coords:coords,
                                  piece: "castles",
                                  moveArr,
                                  team,
                                  captureArr}));
    }

    const onDragEnd = () => {
        dispatch(deleteActivePiece());
    }
    return(
        <>
            <img onDragEnd={onDragEnd}
                 onDragStart={(team === activeTeam) ? onCastleDrag : null}
                 draggable={(team === activeTeam)? true : false}
                 className="piece__castle" 
                 src={(team === 'white') ? whiteCastle : blackCastle} 
                 alt="castle"></img>
        </>
    )
}

export default Castle