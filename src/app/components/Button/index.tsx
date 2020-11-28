import * as React from "react"
import styles from "./styles.module.scss"

import Icon from "../Icon"

interface Props {
    className?: any
    text?: string
    icon?: string
    reference?: React.Ref<HTMLButtonElement>
    onClick?: (e) => void
    onBlur?: (e) => void
}

const Button: React.FunctionComponent<Props> = props => {
    return (
        <button
            onClick={props.onClick}
            onBlur={props.onBlur}
            className={`${styles.button} ${props.className}`}
            ref={props.reference}
        >
            {props.text ? (
                <span className={styles.text}>{props.text}</span>
            ) : null}
            {props.icon ? (
                <Icon className={styles.icon} name={props.icon} />
            ) : null}
        </button>
    )
}

Button.defaultProps = {
    text: null,
    icon: null,
} as Partial<Props>

export default Button
