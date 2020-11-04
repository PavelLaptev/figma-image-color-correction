import * as React from "react"
import styles from "./button.module.scss"

interface Props {
    text: string
    className?: any
    iconColor?: string
    mod?: string
    fileType?: boolean
    accept?: string
    version?: boolean
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void
    onChange?(event: React.FormEvent<HTMLInputElement>): void
}

const Button: React.SFC<Props> = props => {
    const btnComponent = () => {
        return (
            <button
                className={`${styles.button} ${props.className} ${
                    styles[props.mod]
                }`}
                onClick={props.onClick}
                onChange={props.onChange}
            >
                <span>{props.text}</span>
                {props.version ? (
                    <span className={styles.version}>β</span>
                ) : null}
            </button>
        )
    }

    const fileBtnComponent = () => {
        return (
            <label
                className={`${styles.button} ${styles.fileButton} ${
                    props.className
                } ${styles[props.mod]}`}
            >
                <input
                    type="file"
                    onClick={props.onClick}
                    onChange={props.onChange}
                    accept={props.accept}
                />
                <span>{props.text}</span>
            </label>
        )
    }

    return props.fileType ? fileBtnComponent() : btnComponent()
}

Button.defaultProps = {
    className: null,
    mod: "primary",
    fileType: false,
    accept: null,
    version: false,
} as Partial<Props>

export default Button
