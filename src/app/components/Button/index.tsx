import * as React from "react"
import styles from "./styles.module.scss"

import Icon from "../Icon"

interface Props {
    className?: any
    text?: string
    icon?: string
    reference?: React.Ref<HTMLButtonElement>
    type?: string
    onClick?: (e) => void
    onBlur?: (e) => void
    onMouseUp?: (e) => void
    onMouseDown?: (e) => void
    onFocus?: (e) => void
    onFileChange?: (e) => void
}

const Button: React.FunctionComponent<Props> = props => {
    const handleOnFileChange = e => {
        props.onFileChange(e)
    }

    return (
        <button
            onClick={props.onClick}
            onBlur={props.onBlur}
            onMouseUp={props.onMouseUp}
            onMouseDown={props.onMouseDown}
            onFocus={props.onFocus}
            className={`${styles.button} ${props.className}`}
            ref={props.reference}
        >
            {props.type === "input" ? (
                <input
                    type="file"
                    className={styles.input}
                    accept="application/JSON"
                    onClick={e => (e.currentTarget.value = null)}
                    onChange={handleOnFileChange}
                />
            ) : null}
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
    type: "button",
} as Partial<Props>

export default Button
