import * as React from "react"
import styles from "./styles.module.scss"
import { hexToRgb } from "../../utils"

interface Props {
    color?: string
}

const ColorPicker = React.forwardRef(
    (props: Props, ref?: React.Ref<HTMLInputElement>) => {
        const [val, setVal] = React.useState(props.color)

        const handleChange = e => {
            setVal(e.target.value)
        }

        return (
            <div className={styles.wrap} style={{ backgroundColor: val }}>
                <span className={styles.label}>{`RGB(${hexToRgb(val).r}, ${
                    hexToRgb(val).g
                }, ${hexToRgb(val).b})`}</span>
                <input
                    type="color"
                    className={styles.picker}
                    ref={ref}
                    value={val}
                    onChange={handleChange}
                />
            </div>
        )
    }
)

ColorPicker.defaultProps = {
    color: "#fc4848",
} as Partial<Props>

export default ColorPicker
