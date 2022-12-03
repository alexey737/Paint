import React, {useContext} from "react"
import Context from "../../Context"

const PaintShapes = () => {
    const value = useContext(Context)

    const shapesOptionsList = ['rectangle', 'circle', 'triangle', 'fillMode']

    const handlerFillModeIsActive = event => value.setFillMode(event.target.checked)
    const handlerChangeOption = event => value.setOptionIsSelected(event.currentTarget.dataset.option)

    const displayShapesOptions = () => {
        return shapesOptionsList.map((item, index) => {
            return item !== 'fillMode'
                ?
                <li key={index} onClick={handlerChangeOption} className={`shapes__item ${value.optionIsSelected === item ? 'selected' : ''}`} data-option={item}>
                    <img src={`./icons/${item}.svg`} alt={item} />
                    <span className="shapes__label">{item[0].toUpperCase() + item.slice(1)}</span>
                </li>
                :
                <li key={index} onChange={handlerFillModeIsActive} className={`shapes__item ${value.fillMode ? 'active' : ''}`}>
                    <input type="checkbox" id="shapes__checkbox"/>
                    <label className="shapes__label" htmlFor="shapes__checkbox">Fill mode</label>
                </li>
        })
    }

    return (
        <div className="paint__shapes shapes">
            <h3 className="shapes__title">Shapes</h3>
            <ul className="shapes__list">
                {displayShapesOptions()}
            </ul>
        </div>
    )
}

export default PaintShapes
