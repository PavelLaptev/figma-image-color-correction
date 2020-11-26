import * as React from "react"
import styles from "./styles.module.scss"

interface Props {
    height?: string
    margin?: string
}

const ControlsContainer: React.FunctionComponent<Props> = props => {
    return (
        <div
            className={styles.wrap}
            style={{
                height: props.height,
                marginBottom: props.margin,
            }}
        >
            {props.children}
        </div>
    )
}

ControlsContainer.defaultProps = {
    height: "120px",
    margin: "20px",
} as Partial<Props>

export default ControlsContainer
