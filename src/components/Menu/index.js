import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from "./index.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { menuItemClick, actionItemClick } from '@/slice/menuSlice';
import { MENU_ITEMS } from '@/Constants';
import cx from "classnames"

const Menu = () => {

    const dispatch = useDispatch();


    const activeMenuItem = useSelector((state) =>  state.menu.activeMenuItem )

    const handleMenuClick = (itemName) => {

        dispatch(menuItemClick(itemName))
    }
    return (
        <div className={styles.menuContainer}>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL })}>
                <FontAwesomeIcon

                    icon={faPencil}
                    className={styles.icon}
                    onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
                />
            </div>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.ERASER })}>
                <FontAwesomeIcon
                    icon={faEraser}
                    className={styles.icon}
                    onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}

                />
            </div>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.UNDO })}>
                <FontAwesomeIcon
                    icon={faRotateLeft}
                    className={styles.icon}
                    onClick={() => handleMenuClick(MENU_ITEMS.UNDO)}

                />
            </div>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.REDO })}>
                <FontAwesomeIcon
                    icon={faRotateRight}
                    className={styles.icon}
                    onClick={() => handleMenuClick(MENU_ITEMS.REDO)}

                />
            </div>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.DOWNLOAD })}>
                <FontAwesomeIcon
                    icon={faFileArrowDown}
                    className={styles.icon}
                    onClick={() => handleMenuClick(MENU_ITEMS.DOWNLOAD)}

                />
            </div>

        </div>
    )
}

export default Menu