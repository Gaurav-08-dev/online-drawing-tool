import styles from "./index.module.css"
import { COLORS } from "@/Constants"

const Toolbox = () => {

    const updateBrushSize = (e) => {

    }

    const GetColorBox = () => {
        const colorBoxes = [];

        for (let color in COLORS) {
            colorBoxes.push(<div key={color} className={styles.colorBox} style={{ backgroundColor: COLORS[color] }} />)
        }

        return colorBoxes;
    }

    return (
        <div className={styles.toolboxContainer}>

            <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Stroke Color</h4>
                <div className={styles.itemContainer}>
                    <GetColorBox />
                </div>
            </div>

            <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Brush Size</h4>
                <div className={styles.itemContainer}>
                    <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} />
                </div>
            </div>

        </div>
    )
}

export default Toolbox;