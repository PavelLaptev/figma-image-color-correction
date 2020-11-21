import * as React from "react"
import styles from "./styles.module.scss"

import Icon from "../Icon"

interface Props {
    className?: any
    icon?: string
    checked?: boolean
}

const ToolButton: React.FunctionComponent<Props> = props => {
    return (
        <div
            className={`${styles.wrap} ${props.className} ${
                props.checked ? styles.active : null
            }`}
        >
            <input
                type="radio"
                name="tools-group"
                className={styles.originalInput}
                checked={props.checked}
                value={`${props.icon}`}
                onChange={() => {}}
            />
            <Icon name={props.icon} className={styles.icon} />
        </div>
    )
}

ToolButton.defaultProps = {
    icon: null,
    checked: false,
} as Partial<Props>

export default ToolButton
