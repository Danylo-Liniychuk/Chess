import React from "react";
import blackKnight from '../../assets/blackKnight.svg';
import whiteKnight from '../../assets/whiteKnight.svg';
import {bindActivePiece, deleteActivePiece} from "../../reducers/activeSlice";
import { vacantCellsSearch } from "../pawn/Pawn";
import { useDispatch, useSelector} from "react-redux";

const Knight= ({props}) => {
    const dispatch = useDispatch();
    let {coords, team} = props;
    const pieces = useSelector(state => state.pieces)
    const activeTeam = useSelector(state => state.active.activeTeam)


    const moveVariantsHelper = ( coords) => {
        const moveVariants = {
            top: [[coords[0] + 2, coords[1] - 1],[coords[0] + 2, coords[1] + 1]],
            bottom: [[coords[0] - 2, coords[1] - 1],[coords[0] - 2, coords[1] + 1]],
            left: [[coords[0] + 1, coords[1] - 2],[coords[0] - 1, coords[1] - 2]],
            right: [[coords[0] + 1, coords[1] + 2],[coords[0] - 1, coords[1] + 2]],
        }
        const moveArr = [], 
              captureArr = []
        for (let key in moveVariants) {
            for (let i = 0; i <=1; i++ ){
                const x = moveVariants[key][i][0], 
                      y = moveVariants[key][i][1];
                if( x > 0 && y > 0 && !vacantCellsSearch(`${x}` + y, pieces)) {
                    moveArr.push([x, y])
                } else if (x > 0 && y > 0 && vacantCellsSearch(`${x}` + y, pieces) && vacantCellsSearch(`${x}` + y, pieces, true).team !== team) {
                    captureArr.push([x, y])
                }
            }
        }

        return {moveArr, captureArr}

    }

    const onKnightDrag = () => {
        dispatch(bindActivePiece({coords:coords,
            piece: "knights",
            moveArr: moveVariantsHelper(coords).moveArr,
            team,
            captureArr:moveVariantsHelper(coords).captureArr }));
    }

    const onDragEnd = () => {
        dispatch(deleteActivePiece());
    }
    return(
        <>
            <img onDragEnd={onDragEnd}
                 onDragStart={onKnightDrag}
                 draggable={(team === activeTeam)? true : false}
                 className="piece__castle" src={(team === 'white') ? whiteKnight : blackKnight} 
                 alt="castle"></img>
        </>
    )
}

export default Knight;