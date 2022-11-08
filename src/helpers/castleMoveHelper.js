import vacantCellsSearch from "./vacantCellSearch";

const oneSideBorder = (side, coords, pieces) => {
    switch (side) {
        case 'top' : 
            for (let i = coords[0] + 1; i <= 8; i++){
                if (vacantCellsSearch(`${i}` + coords[1], pieces)){
                    return [i , coords[1]]
                }
            }
            break
        case 'bottom' :
            for (let i = coords[0] - 1; i >= 0; i--){
                if (vacantCellsSearch(`${i}` + coords[1], pieces)){
                    return [i , coords[1]]
                }
            }
            break
        case 'left' :
            for (let i = coords[1] - 1; i >= 0; i--){
                if (vacantCellsSearch(`${coords[0]}` + i, pieces)){
                    return [coords[0] , i]
                }
            }
            break
        case 'right' :
            for (let i = coords[1] + 1; i <= 8; i++) {
                if (vacantCellsSearch(`${coords[0]}` + i, pieces)){
                    return [coords[0] , i]
                }
            }
            break
        default:
            break
    }
}

export default function castleMoveHelper(coords, pieces, team) {
    let moveArr = [],
        captureArr = [];
    const borderList = {
        top : oneSideBorder('top', coords, pieces),
        bottom : oneSideBorder('bottom', coords, pieces),
        left : oneSideBorder('left', coords, pieces),
        right : oneSideBorder('right', coords, pieces),
    }
    for (let i = (!!borderList.bottom) ? borderList.bottom[0] + 1 : 1; i < ((!!borderList.top) ? borderList.top[0] : 9); i++){
        moveArr.push([i, coords[1]])
    }
    for (let i = (!!borderList.left) ? borderList.left[1] + 1 : 1; i < ((!!borderList.right) ? borderList.right[1] : 9); i++){
        moveArr.push([coords[0], i])
    }
    for (let key in borderList) {
        const item = vacantCellsSearch(`${borderList[key]?.[0]}` + borderList[key]?.[1], pieces, true);
        if(item && item.team !== team){
            captureArr.push(borderList[key])
        }
    }
    moveArr = moveArr.filter(item => JSON.stringify(item) !== JSON.stringify(coords));
    return {moveArr, captureArr}
} 