import * as React from "react"
import styles from "./rangecontainer.module.scss"

interface Props {
    height: string
}

const RangeContainer: React.FunctionComponent<Props> = props => {
    return (
        <div className={styles.wrap} style={{ height: props.height }}>
            {props.children}
        </div>
    )
}

RangeContainer.defaultProps = {
    height: "100px",
} as Partial<Props>

export default RangeContainer
