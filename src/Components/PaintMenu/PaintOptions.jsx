import React, {useContext} from "react"
import Context from "../../Context"

const PaintOptions = () => {
    const value = useContext(Context)

    const optionsList = ['brush', 'eraser', 'rangeLineWidth']

    const handlerChangeLineWidth = event => value.setLineWidth(event.target.value)
    const handlerChangeOption = event => value.setOptionIsSelected(event.currentTarget.dataset.option)

    const displayOptions = () => {
        return optionsList.map((item, index) => {
            return item !== 'rangeLineWidth'
                ?
                <li key={index} onClick={handlerChangeOption} className={`options__item ${value.optionIsSelected === item ? 'selected' : ''}`} data-option={item}>
                    <img src={`./icons/${item}.svg`} alt={`item`} />
                    <span className="options__label">{item[0].toUpperCase() + item.slice(1)}</span>
                </li>
                :
                <li key={index} className="options__item">
                    <input onChange={handlerChangeLineWidth} id="options__range" type="range" min="1" max="100" step="1" value={value.lineWidth}/>
                    <label className="options__label" htmlFor="options__range">{value.lineWidth}</label>
                </li>
        })
    }

    return (
        <div className="paint__options options">
            <h3 className="options__title">Options</h3>
            <ul className="options__list">
                {displayOptions()}
            </ul>
        </div>
    )
}

export default PaintOptions
