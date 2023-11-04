import { useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MENU_ITEMS } from "@/Constants";
import { actionItemClick } from "@/slice/menuSlice";


const Board = () => {

    const dispatch = useDispatch()
    const canvasRef = useRef(null);
    const shouldDraw = useRef(null);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);

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

        else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {


            if (historyPointer.current < 0) { historyPointer.current = 0; return; }
            if (historyPointer.current > drawHistory.current.length) { historyPointer.current = drawHistory.current.length; return }

            if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
            if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1


            const imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData, 0, 0);

            dispatch(actionItemClick(null))

        }
        else if (actionMenuItem === MENU_ITEMS.REDO) { }




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
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData)
            historyPointer.current = drawHistory.current.length - 1;

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
        <canvas ref={canvasRef} ></canvas>
    )
}


export default Board;