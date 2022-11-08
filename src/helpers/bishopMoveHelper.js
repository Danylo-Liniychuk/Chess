import vacantCellsSearch from "./vacantCellSearch";

export default function bishopMoveHelper (coords, pieces, team)  {
    const moveArr = [];
    const captureArr = [];
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

        for ( let key in moveVariantsObj) {
            if(moveVariantsObj[key] && moveVariantsObj[key].team !== team){
                captureArr.push(moveVariantsObj[key].coords)
            }
        }
        counterTop++
    }

    return {moveArr, captureArr}
}