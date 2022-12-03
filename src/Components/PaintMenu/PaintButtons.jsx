import React, { useContext } from "react"
import Context from "../../Context"

const PaintButtons = () => {
    const value = useContext(Context)

    const handlerClearCanvas = () => value.setIsClear(true)

    return (
        <div className="paint__buttons">
            <button onClick={handlerClearCanvas} className="buttons__item button-clear">Clear Canvas</button>
            <button className="buttons__item button-download">
                <a href={value.canvasURL} download='canvas-image' className='button-download__link'>Save As Image</a>
            </button>
        </div>
    )
}

export default PaintButtons