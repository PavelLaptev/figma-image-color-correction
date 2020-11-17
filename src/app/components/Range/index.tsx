import * as React from "react"
import styles from "./range.module.scss"
import { rangeInterpolation } from "../../../utils"

interface Props {
    label?: string
    id: string
    value?: number
    min?: number
    max?: number
    step?: number
    reference?: React.Ref<HTMLInputElement>
    onChange?(event: React.FormEvent<HTMLInputElement>): void
}

const Range: React.FunctionComponent<Props> = props => {
    const [val, aetVal] = React.useState(props.value)

    const handleChange = e => {
        aetVal(e.target.value)
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
} as Partial<Props>

export default Range
