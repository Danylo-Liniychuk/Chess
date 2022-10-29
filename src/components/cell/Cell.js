import React from "react";
import Pawn from "../pawn/Pawn";


const Cell = ({props}) => {
    const black = props.black,
          coords = props.coords;
    return (
        <>
            <div className={(black) ? "board__cell-black" : "board__cell"}>
                {(coords[0] === 2 || coords[0] === 7 ) ? <Pawn props={{coords}}/> : null}
            </div>
        </>
    )
}

export default Cell