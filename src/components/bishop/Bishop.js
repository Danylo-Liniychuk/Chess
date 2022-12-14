import React from "react";
import blackBishop from '../../assets/blackBishop.svg';
import whiteBishop from '../../assets/whiteBishop.svg';
import {bindActivePiece, deleteActivePiece} from "../../reducers/activeSlice";
import bishopMoveHelper from "../../helpers/bishopMoveHelper";
import { useDispatch, useSelector} from "react-redux";

const Bishop = ({props}) => {
    const dispatch = useDispatch();
    let {coords, team} = props;
    const pieces = useSelector(state => state.pieces)
    const activeTeam = useSelector(state => state.active.activeTeam)





    const onBishopDrag = () => {
        const {moveArr, captureArr} = bishopMoveHelper(coords, pieces, team);
        dispatch(bindActivePiece({coords:coords,
            piece: "bishops",
            moveArr: moveArr,
            team,
            captureArr }));
    }

    const onDragEnd = () => {
        dispatch(deleteActivePiece());
    }
    return(
        <>
            <img onDragEnd={onDragEnd}
                 onDragStart={onBishopDrag}
                 draggable={(team === activeTeam)? true : false}
                 className="piece__castle" src={(team === 'white') ? whiteBishop : blackBishop} 
                 alt="castle"></img>
        </>
    )
}

export default Bishop;