import * as React from "react"
import styles from "./range.module.scss"

interface Props {
    label: string
    id: string
    value?: number
    min?: number
    max?: number
    reference?: React.Ref<HTMLInputElement>
}

const Range: React.FunctionComponent<Props> = props => {
    const [val, aetVal] = React.useState(props.value)

    const handleChange = e => {
        aetVal(e.target.value)
    }

    return (
        <div className={styles.range}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type="range"
                id={props.id}
                min={props.min}
                max={props.max}
                ref={props.reference}
                value={val}
                onChange={handleChange}
            />
        </div>
    )
}

Range.defaultProps = {
    min: 0,
    max: 100,
    reference: null,
    value: 50,
} as Partial<Props>

export default Range
