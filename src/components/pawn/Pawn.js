import React from "react";
import blackPawn from '../../assets/blackPawn.svg';
import whitePawn from '../../assets/whitePawn.svg';
import {bindActivePiece, deleteActivePiece} from "../../reducers/activeSlice";
import { useDispatch, useSelector} from "react-redux";


export const vacantCellsSearch = (id, obj, getObj = false) => {
        let status = false, desiredObj = null;
        for (let i in obj) {
            status = obj[i].hasOwnProperty(id);
            if(status) {
                desiredObj = obj[i][id]
                break
            }
        }
        if (!getObj) {
            return status
        } else {
            return desiredObj
        }
}

const Pawn = ({props}) => {
    const dispatch = useDispatch();
    let {coords, team} = props;
    const pieces = useSelector(state => state.pieces);
    const activeTeam = useSelector(state => state.active.activeTeam)


    const idCreator = (team, method = 'move') => {
        if(method === 'move') {
            if(team === 'white') {
                return `${coords[0] + 1}` + coords[1]
            } else {
                return `${coords[0] - 1}` + coords[1]
            }
        } else{
            if(team === 'white') {
                return [`${coords[0] + 1}` + (coords[1] + 1), `${coords[0] + 1}`+ (coords[1] - 1)]
            } else {
                return [`${coords[0] - 1}` + (coords[1] + 1), `${coords[0] - 1}`+ (coords[1] - 1)]
            }
        }
    }
    
    const moveVariantsHelper = (team, coords) => {
            let moveArr = [],
            id = idCreator(team),
            nextCellVacant = vacantCellsSearch(id, pieces);
            if(coords[0] === 2 && team === 'white') {
                moveArr = (nextCellVacant) ?  [] : [[coords[0] + 1, coords[1]], [coords[0] + 2, coords[1]]];
            } else if(coords[0] === 7 && team === 'black'){
                moveArr = (nextCellVacant) ?  [] : [[coords[0] - 1, coords[1]], [coords[0] - 2, coords[1]]];
            } else {
                moveArr = (nextCellVacant) ?  [] : [[+id[0], +id[1]]];
            }
            return moveArr
    }
    
    const capturesHelper = (team, coords) => {
        let captureArr = [], 
            captureVariants = idCreator(team, 'capture');
        captureVariants.forEach(item => {
            if (vacantCellsSearch(item, pieces) && vacantCellsSearch(item, pieces, true).team !== team){
                captureArr.push([+item[0], +item[1]])
            }
        })
        return captureArr;
    }

    const onPawnDrag = () => {
        dispatch(bindActivePiece({coords:coords,
                                  piece: "pawns",
                                  moveArr: moveVariantsHelper(team, coords),
                                  team,
                                  captureArr:capturesHelper(team, coords)}));
    }

    const onDragEnd = () => {
        dispatch(deleteActivePiece());
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