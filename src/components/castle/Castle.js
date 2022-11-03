// import React from "react";
// import blackCastle from '../../assets/blackCastle.svg';
// import whiteCastle from '../../assets/whiteCastle.svg';
// import {bindActivePiece, deleteActivePiece} from "../../reducers/activeSlice";
// import { useDispatch, useSelector} from "react-redux";

// const Castle = ({props}) => {
//     const dispatch = useDispatch();
//     let {coords, team} = props;
//     const activeTeam = useSelector(state => state.active.activeTeam);
//     const pieces = useSelector(state => state.pieces);



//     const borderSearch = (position) => { 
//         const breakPoints = {};
//         for (let i = position[1] - 1; i >= 0; i--){
//             if (breakPoints.left){
//                 break
//             }
//             breakPoints.left = (pawns?.[`${coords[0]}` + i]) ? [coords[0] , i] : null;
//         }

//         for (let i = position[1] + 1; i <= 8; i++) {
//             if (breakPoints.right){
//                 break
//             }
//             breakPoints.right = (pawns?.[`${coords[0]}` + i]) ? [coords[0] , i] : null;
//         }

//         for (let i = position[0] - 1; i >= 0; i--){
//             if (breakPoints?.bottom){
//                 break
//             }
//             breakPoints.bottom = (pawns?.[`${i}` + coords[1]]) ? [i , coords[1]] : null;
//         }

//         for (let i = position[0] + 1; i <= 8; i++){
//             if (breakPoints.top){
//                 break
//             }
//             breakPoints.top = (pawns?.[`${i}` + coords[1]]) ? [i , coords[1]] : null;
//         }
//         return breakPoints;
//     }
//     const onDragEnd = () => {
//         dispatch(deleteActivePiece());
//     }


//     const onCastleDrag = () => {
//         let moveArr = [], captureArr = [];
//         const breakPoints = borderSearch(coords);
//         for (let i = (!!breakPoints.left) ? breakPoints.left[1] : 1; i < ((!!breakPoints.right) ?  breakPoints.right[1] : 9); i++ ) {
//             moveArr.push([coords[0], i])
//         }
//         for (let i = (!!breakPoints.bottom) ? breakPoints.bottom[0] : 1; i < ((!!breakPoints.top) ?  breakPoints.top[0] : 9); i++ ) {
//             moveArr.push([i, coords[1]])
//         }
//         moveArr = moveArr.filter(item => JSON.stringify(item) !== JSON.stringify(coords));
//         dispatch(bindActivePiece({coords:coords, piece: "castle", moveArr, team, captureArr}));
//     }
//     return(
//         <>
//             <img onDragEnd={onDragEnd}
//                  onDragStart={(team === activeTeam) ? onCastleDrag : null}
//                  draggable={(team === activeTeam)? true : false}
//                  className="piece__castle" 
//                  src={(team === 'white') ? whiteCastle : blackCastle} 
//                  alt="castle"></img>
//         </>
//     )
// }

// export default Castle