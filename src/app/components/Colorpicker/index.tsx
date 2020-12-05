import * as React from "react"
import styles from "./styles.module.scss"
import { hexToRgb } from "../../utils"

interface Props {
    color?: string
    onMouseUp?: (e) => void
}

interface RefObject {
    reset: () => void
}

const ColorPicker = React.forwardRef(
    (props: Props, ref: React.Ref<RefObject>) => {
        const [val, setVal] = React.useState(props.color)

        React.useImperativeHandle(ref, () => ({
            reset() {
                setVal(props.color)
            },
        }))

        const handleChange = e => {
            setVal(e.target.value)
        }

        const handleMouseUp = e => {
            props.onMouseUp(e)
        }

        return (
            <div className={styles.wrap} style={{ backgroundColor: val }}>
                <span className={styles.label}>{`RGB(${hexToRgb(val).r}, ${
                    hexToRgb(val).g
                }, ${hexToRgb(val).b})`}</span>
                <input
                    type="color"
                    className={styles.picker}
                    ref={ref as any}
                    value={val}
                    onChange={handleChange}
                    onBlur={handleMouseUp}
                />
            </div>
        )
    }
)

ColorPicker.defaultProps = {
    color: "#ca4040",
} as Partial<Props>

export default ColorPicker
