import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";


const Board = () => {

    const canvasRef = useRef(null);
    const shouldDraw = useRef(null);

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

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


    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        const handleMousedown = (e) => {
            shouldDraw.current = true;
            context.beginPath() // beginning to draw
            context.moveTo(e.clientX, e.clientY) // start in given coordinates

        }
        const handleMousemove = (e) => {
            if (!shouldDraw.current) return;
            context.lineTo(e.clientX, e.clientY) // move to given coordinates
            context.stroke() // draw a line between coordinates travelled

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