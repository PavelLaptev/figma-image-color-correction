import * as React from "react"
import styles from "./styles.module.scss"
import { rangeInterpolation } from "../../utils"

interface Props {
    label?: string
    id?: string
    value?: number
    min?: number
    max?: number
    step?: number
    // ref?: React.Ref<HTMLInputElement>
    color?: string
}

const Range = React.forwardRef((props: Props, ref) => {
    const [val, setVal] = React.useState(props.value)

    const handleChange = e => {
        setVal(e.target.value)
    }

    return (
        <div className={styles.range}>
            <input
                type="range"
                id={props.id}
                min={props.min}
                max={props.max}
                ref={ref as any}
                value={val}
                step={props.step}
                onChange={handleChange}
            />
            <span className={styles.label}>{props.label}</span>
            <div
                className={styles.default}
                style={{
                    left: `${rangeInterpolation(
                        props.min,
                        props.max,
                        1,
                        100,
                        props.value
                    )}%`,
                    display:
                        rangeInterpolation(
                            props.min,
                            props.max,
                            1,
                            100,
                            props.value
                        ) <= 1
                            ? "none"
                            : "block",
                }}
            />
            <div
                className={styles.scale}
                style={{
                    width: `${rangeInterpolation(
                        props.min,
                        props.max,
                        1,
                        100,
                        val
                    )}%`,
                    backgroundImage: `linear-gradient(
                        270deg,
                        ${props.color} 14%,
                        var(--base-middle-clr) 100%
                    )`,
                }}
            />
        </div>
    )
})

Range.defaultProps = {
    min: 0,
    max: 100,
    // reference: null,
    value: 50,
    step: 1,
    label: null,
    color: "var(--secondary-clr)",
} as Partial<Props>

export default Range
