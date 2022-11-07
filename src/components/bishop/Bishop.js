import React from "react";
import blackBishop from '../../assets/blackBishop.svg';
import whiteBishop from '../../assets/whiteBishop.svg';
import {bindActivePiece, deleteActivePiece} from "../../reducers/activeSlice";
import { vacantCellsSearch } from "../pawn/Pawn";
import { useDispatch, useSelector} from "react-redux";

const Bishop = ({props}) => {
    const dispatch = useDispatch();
    let {coords, team} = props;
    const pieces = useSelector(state => state.pieces)
    const activeTeam = useSelector(state => state.active.activeTeam)


    const moveVariantsHelper = () => {
        const moveArr = []
        const moveVariantsObj = {rt : vacantCellsSearch(`${coords[0] + 1}` + (coords[1] + 1), pieces, true),
                                 lt : vacantCellsSearch(`${coords[0] + 1}` + (coords[1] - 1), pieces, true),
                                 rb : vacantCellsSearch(`${coords[0] - 1}` + (coords[1] + 1), pieces, true),
                                 lb : vacantCellsSearch(`${coords[0] - 1}` + (coords[1] - 1), pieces, true)};
        let counterBottom = 1,
            counterTop = 1;
        for (let i = coords[0] - 1; i >= 1 ; i--) {
            if (coords[1] + counterBottom <= 8 && !moveVariantsObj.rb){
                const wall = vacantCellsSearch(`${i}` + (coords[1] + counterBottom), pieces, true);
                (wall) ? moveVariantsObj.rb = wall : moveArr.push([i, coords[1] + counterBottom]);
            }
            if (coords[1] - counterBottom >= 1 && !moveVariantsObj.lb) {
                const wall = vacantCellsSearch(`${i}` + (coords[1] - counterBottom), pieces, true);
                (wall) ? moveVariantsObj.lb = wall : moveArr.push([i, coords[1] - counterBottom]);
            }                
            counterBottom++
             
        }
        for (let i = coords[0] + 1; i <= 8 ; i++ ){
            if (coords[1] + counterTop <= 8 && !moveVariantsObj.rt){
                const wall = vacantCellsSearch(`${i}` + (coords[1] + counterTop), pieces, true);
                (wall) ? moveVariantsObj.rt = wall : moveArr.push([i, coords[1] + counterTop]);
            }
            if (coords[1] - counterTop >= 1 && !moveVariantsObj.lt) {
                const wall = vacantCellsSearch(`${i}` + (coords[1] - counterTop), pieces, true);
                (wall) ? moveVariantsObj.lt = wall : moveArr.push([i, coords[1] - counterTop]);
            }
            counterTop++
        }

        return {moveArr, moveVariantsObj}
    }


    const onBishopDrag = () => {
        const {moveArr, moveVariantsObj} = moveVariantsHelper();
        const captureArr = []
        for ( let key in moveVariantsObj) {
            if(moveVariantsObj[key]?.team && moveVariantsObj[key]?.team !== team){
                captureArr.push(moveVariantsObj[key].coords)
            }
        }
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