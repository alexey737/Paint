import React, { useState } from 'react'
import PaintMenu from './PaintMenu/PaintMenu.jsx'
import PaintCanvas from './PaintCanvas/PaintCanvas.jsx'
import Context from "../Context.js"

const Paint = () => {
    const [canvasURL, setCanvasURL] = useState(null)
    const [rgbColor, setRgbColor] = useState('#1c75e1')
    const [lineColor, setLineColor] = useState('#000')
    const [lineWidth, setLineWidth] = useState(1)
    const [optionIsSelected, setOptionIsSelected] = useState('brush')
    const [isClear, setIsClear] = useState(false)
    const [fillMode, setFillMode] = useState(false)

    const value = {
        canvasURL, setCanvasURL,
        rgbColor, setRgbColor,
        lineColor, setLineColor,
        lineWidth, setLineWidth,
        optionIsSelected, setOptionIsSelected,
        isClear, setIsClear,
        fillMode, setFillMode
    }

    return (
        <Context.Provider value={value}>
            <div className='paint'>
                <div className="paint__container _container">
                    <PaintMenu />
                    <PaintCanvas />
                </div>
            </div>
        </Context.Provider>
    )
}

export default Paint