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
    reference?: React.Ref<HTMLInputElement>
    color?: string
    onChange?(event: React.FormEvent<HTMLInputElement>): void
}

const Range: React.FunctionComponent<Props> = props => {
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
                ref={props.reference}
                value={val}
                step={props.step}
                onChange={handleChange}
            />
            <span className={styles.label}>{props.label}</span>
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
                        #${props.color} 14.35%,
                        #${props.color}00 104.48%
                    )`,
                }}
            />
        </div>
    )
}

Range.defaultProps = {
    min: 0,
    max: 100,
    reference: null,
    value: 50,
    step: 1,
    label: null,
    color: "7748fc",
} as Partial<Props>

export default Range

// TODO
// Add a color variable
