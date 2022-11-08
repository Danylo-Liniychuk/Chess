import React from "react";
import blackQueen from '../../assets/blackQueen.svg';
import whiteQueen from '../../assets/whiteQueen.svg';
import {bindActivePiece, deleteActivePiece} from "../../reducers/activeSlice";
import bishopMoveHelper from "../../helpers/bishopMoveHelper";
import castleMoveHelper from "../../helpers/castleMoveHelper";
import { useDispatch, useSelector} from "react-redux";

const Queen = ({props}) => {
    const dispatch = useDispatch();
    let {coords, team} = props;
    const pieces = useSelector(state => state.pieces)
    const activeTeam = useSelector(state => state.active.activeTeam)


    const onQueenDrag = () => {
        const castleMovesArr = castleMoveHelper(coords,pieces, team),
              bishopMovesArr = bishopMoveHelper(coords, pieces, team);
        dispatch(bindActivePiece({coords:coords,
            piece: "queens",
            moveArr: castleMovesArr.moveArr.concat(bishopMovesArr.moveArr),
            team,
            captureArr: castleMovesArr.captureArr.concat(bishopMovesArr.captureArr)}));
    }

    const onDragEnd = () => {
        dispatch(deleteActivePiece());
    }
    return(
        <>
            <img onDragEnd={onDragEnd}
                 onDragStart={onQueenDrag}
                 draggable={(team === activeTeam)? true : false}
                 className="piece__castle" src={(team === 'white') ? whiteQueen : blackQueen} 
                 alt="castle"></img>
        </>
    )
}

export default Queen;