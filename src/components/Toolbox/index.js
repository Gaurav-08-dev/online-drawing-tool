import { useSelector, useDispatch } from "react-redux"
import cx from "classnames"
import styles from "./index.module.css"
import { COLORS, MENU_ITEMS } from "@/Constants"
import { changeColor, changeBrushSize } from "@/slice/toolboxSlice"
import { socket } from "@/socket";

const Toolbox = () => {

    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || MENU_ITEMS.ERASER


    const updateBrushSize = (e) => {
        dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }))

        socket.emit('changeConfig', { color, size: e.target.value })
    }

    const updateColor = (newColor) => {
        dispatch(changeColor({ item: activeMenuItem, color: newColor }))
        socket.emit('changeConfig', { color: newColor, size })

    }

    const GetColorBox = () => {
        const colorBoxes = [];

        let index = 0;
        for (let item in COLORS) {


            colorBoxes.push(
                <div
                    key={color + index}
                    className={cx(styles.colorBox, { [styles.active]: color === COLORS[item] })}
                    style={{ backgroundColor: COLORS[item] }}
                    onClick={() => updateColor(COLORS[item])}
                />
            )
            index += 1
        }
        return colorBoxes;
    }

    

    return (
        <div className={styles.toolboxContainer}>
            {showStrokeToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Stroke Color</h4>
                <div className={styles.itemContainer}>
                    <GetColorBox />
                </div>
            </div>}

            {showBrushToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Brush Size</h4>
                <div className={styles.itemContainer}>
                    <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} value={size} />
                </div>
            </div>}

        </div>
    )
}

export default Toolbox;