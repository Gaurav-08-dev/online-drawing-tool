import { useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MENU_ITEMS } from "@/Constants";
import { actionItemClick } from "@/slice/menuSlice";


const Board = () => {

    const dispatch = useDispatch()
    const canvasRef = useRef(null);
    const shouldDraw = useRef(null);

    const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu)
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');


        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {

            const URL = canvas.toDataURL()
            const anchor = document.createElement('a')
            anchor.href = URL;
            anchor.download = 'sketch.jpeg'
            anchor.click()
            dispatch(actionItemClick(null))
        }
    }, [actionMenuItem, dispatch])

    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const changeConfig = () => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }

        changeConfig()

    }, [color, size])


    // before browser paints
    useLayoutEffect(() => {

        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        const beginPath = (x, y) => {
            context.beginPath() // beginning to draw
            context.moveTo(x, y) // start in given coordinates
        }

        const drawLine = (x, y) => {
            context.lineTo(x, y) // move to given coordinates
            context.stroke() // draw a line between coordinates travelled
        }

        const handleMousedown = (e) => {
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY)
        }

        const handleMousemove = (e) => {
            if (!shouldDraw.current) return;
            drawLine(e.clientX, e.clientY)

        }

        const handleMouseup = (e) => {
            shouldDraw.current = false
        }

        canvas.addEventListener('mousedown', handleMousedown)
        canvas.addEventListener('mousemove', handleMousemove)
        canvas.addEventListener('mouseup', handleMouseup)


        return () => {
            canvas.removeEventListener('mousedown', handleMousedown)
            canvas.removeEventListener('mousemove', handleMousemove)
            canvas.removeEventListener('mouseup', handleMouseup)
        }
    }, [])
    return (
        <canvas ref={canvasRef}></canvas>
    )
}


export default Board;