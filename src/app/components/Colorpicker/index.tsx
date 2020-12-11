import * as React from "react"
import styles from "./styles.module.scss"
import { rangeInterpolation } from "../../../utils"

interface Props {
    onMouseUp?: (e) => void
}

interface RefObject {
    reset: (val) => void
}

const Range = React.forwardRef((props: Props, ref: React.Ref<RefObject>) => {
    const [val, setVal] = React.useState(0)

    React.useImperativeHandle(ref, () => ({
        reset() {
            setVal(0)
        },
    }))

    const handleChange = e => {
        setVal(e.target.value)
    }

    const handleMouseUp = e => {
        props.onMouseUp(e)
    }

    return (
        <div className={styles.range}>
            <input
                type="range"
                max={360}
                ref={ref as any}
                value={val}
                onChange={handleChange}
                onMouseUp={handleMouseUp}
            />
            <div
                className={styles.thumb}
                style={{
                    left: `${rangeInterpolation(0, 360, 1, 93, val)}%`,
                }}
            />
        </div>
    )
})

export default Range
