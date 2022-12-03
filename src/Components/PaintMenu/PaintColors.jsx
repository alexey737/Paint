import React, {useContext, useEffect, useState} from "react"
import Context from "../../Context"

const PaintColors = () => {
    const value = useContext(Context)

    const colorsList = ['white', 'black', 'red', 'green', 'rgb']
    const [colorIsSelected, setColorIsSelected] = useState('black')

    const handlerSelectColor = event => setColorIsSelected(event.target.dataset.color)
    const handlerChangeRgbColor = event => value.setRgbColor(event.target.value)
    useEffect(() => value.setLineColor(colorIsSelected === 'rgb' ? value.rgbColor : colorIsSelected), [colorIsSelected, value.rgbColor])

    const displayColors = () => {
        return colorsList.map((item, index) => {
            return item !== 'rgb' ? <li key={index} onClick={handlerSelectColor} className={`colors__item ${item} ${item === colorIsSelected && value.optionIsSelected !== 'eraser' ? 'selected' : ''}`} data-color={item}></li>
                :   <li key={index} onClick={handlerSelectColor} className={`colors__item ${item} ${item === colorIsSelected ? 'selected' : ''}`}>
                    <input onChange={handlerChangeRgbColor} type="color" value={value.rgbColor} data-color={item}/>
                </li>
        })
    }

    return (
        <div className="paint__colors colors">
            <h3 className="colors__title">Colors</h3>
            <ul className={`colors__list ${value.optionIsSelected === 'eraser' ? 'disabled' : ''}`}>
                {displayColors()}
            </ul>
        </div>
    )
}

export default PaintColors
