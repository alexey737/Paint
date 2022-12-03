import React, { useState, useEffect, useRef, useContext } from "react"
import Context from "../../Context.js"

const useCanvasSize = () => {
    const [canvasSize, setCanvasSize] = useState({
        canvasWidth: null,
        canvasHeight: null
    })

    useEffect(() => {
        window.addEventListener('load', () => {
            const canvasParent = document.querySelector('canvas').offsetParent
            setCanvasSize({
                canvasWidth: canvasParent.offsetWidth + 1,
                canvasHeight: canvasParent.offsetHeight + 1
            })
        })
    }, [])

    return canvasSize
}

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null
    })

    useEffect(() => {
        const canvasParent = document.querySelector('canvas').offsetParent
        
        const handleMouseMove = event => {
            setMousePosition({
                x: event.clientX - canvasParent.offsetLeft,
                y: event.clientY - canvasParent.offsetTop
            })
        }

        canvasParent.addEventListener('mousemove', handleMouseMove)

    }, [])

    return mousePosition
}

const PaintCanvas = () => {
    const value = useContext(Context)

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [startDrawing, setStartDrawing] = useState(false)
    const [snapshot, setSnapshot] = useState(null)
    const {canvasWidth, canvasHeight} = useCanvasSize()
    const {x, y} = useMousePosition()
    const [straightLine, setStraightLine] = useState(false)
    const [prevCoords, setPrevCoords] = useState({
        prevX: null,
        prevY: null
    })

    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext('2d')
        const ctx = ctxRef.current

        ctx.lineWidth = value.lineWidth

        if (value.isClear) {
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvasWidth, canvasHeight)
            value.setIsClear(false)
        }

        if (value.optionIsSelected === 'brush') {
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.strokeStyle = value.lineColor
        } else if (value.optionIsSelected === 'eraser') {
            ctx.lineCap = 'butt'
            ctx.lineJoin = 'round'
            ctx.strokeStyle = '#fff'
        } else if (value.optionIsSelected === 'rectangle') {
            ctx.fillStyle = value.lineColor
            ctx.strokeStyle = value.lineColor
            ctx.lineCap = 'butt'
            ctx.lineJoin = 'miter'
        } else if (value.optionIsSelected === 'circle') {
            ctx.fillStyle = value.lineColor
            ctx.strokeStyle = value.lineColor
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
        } else if (value.optionIsSelected === 'triangle') {
            ctx.fillStyle = value.lineColor
            ctx.strokeStyle = value.lineColor
            ctx.lineCap = 'butt'
            ctx.lineJoin = 'miter'
        }

        value.setCanvasURL(canvasRef.current.toDataURL())

    }, [value.lineWidth, value.optionIsSelected, value.lineColor, value.isClear, value.fillMode])

    useEffect(() => {
        ctxRef.current.fillStyle = '#fff'
        ctxRef.current.fillRect(0, 0, canvasWidth, canvasHeight)
        ctxRef.current.fillStyle = value.lineColor
    }, [canvasHeight, canvasWidth])

    const handlerStraightLine = event => {
        console.log(event);
        if (!straightLine && event.type === 'keydown' && event.key === 'Shift') {
            setStraightLine(true)
        } else if (event.type === 'keyup') {
            setStraightLine(false)
        }
    }

    const handlerStartDrawing = () => {
        setStartDrawing(true)
        setPrevCoords({
            prevX: x,
            prevY: y
        })
        ctxRef.current.beginPath()
        ctxRef.current.moveTo(x, y)
        setSnapshot(ctxRef.current.getImageData(0, 0, canvasWidth, canvasHeight))
    }

    const handlerDrawing = () => {
        if (startDrawing) {
            ctxRef.current.putImageData(snapshot, 0, 0)
            if ((value.optionIsSelected === 'brush' || value.optionIsSelected === 'eraser') && !straightLine) {
                ctxRef.current.lineTo(x, y)
                ctxRef.current.stroke()
            } else if (value.optionIsSelected === 'brush' && straightLine) {
                console.log(true);
                ctxRef.current.beginPath()
                ctxRef.current.moveTo(prevCoords.prevX, prevCoords.prevY)
                ctxRef.current.lineTo(x, y)
                ctxRef.current.stroke()
            } else if (value.optionIsSelected === 'rectangle') {
                value.fillMode
                    ? ctxRef.current.fillRect(x, y, prevCoords.prevX - x, prevCoords.prevY - y)
                    : ctxRef.current.strokeRect(x, y, prevCoords.prevX - x, prevCoords.prevY - y)
            } else if (value.optionIsSelected === 'circle') {
                ctxRef.current.beginPath()
                const radius = Math.sqrt(Math.pow((prevCoords.prevX - x), 2) + Math.pow((prevCoords.prevY - y), 2))
                ctxRef.current.arc(prevCoords.prevX, prevCoords.prevY, radius, 0, 2 * Math.PI)
                value.fillMode ? ctxRef.current.fill() : ctxRef.current.stroke()
            } else if (value.optionIsSelected === 'triangle') {
                ctxRef.current.beginPath()
                ctxRef.current.moveTo(prevCoords.prevX, prevCoords.prevY)
                ctxRef.current.lineTo(x, y)
                ctxRef.current.lineTo(prevCoords.prevX * 2 - x, y)
                ctxRef.current.closePath()
                value.fillMode ? ctxRef.current.fill() : ctxRef.current.stroke()
            }
        }
    }

    const handlerStopDrawing = () => {
        setStartDrawing(false)
        ctxRef.current.closePath()
        value.setCanvasURL(canvasRef.current.toDataURL())
    }

    return (
        <section className="paint__canvas">
            <canvas
                    tabIndex={0}
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    onMouseDown={handlerStartDrawing}
                    onMouseMove={handlerDrawing}
                    onMouseUp={handlerStopDrawing}
                    onMouseLeave={handlerStopDrawing}
                    onKeyDown={handlerStraightLine}
                    onKeyUp={handlerStraightLine}
            ></canvas>
        </section>
    )
}

export default PaintCanvas