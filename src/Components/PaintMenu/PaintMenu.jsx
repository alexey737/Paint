import React from "react"
import PaintShapes from "./PaintShapes.jsx"
import PaintOptions from "./PaintOptions.jsx"
import PaintColors from "./PaintColors.jsx"
import PaintButtons from "./PaintButtons.jsx"

const PaintMenu = () => {
    return (
        <section className="paint__menu">
            <PaintShapes />
            <PaintOptions />
            <PaintColors />
            <PaintButtons />
        </section>
    )
}

export default PaintMenu
