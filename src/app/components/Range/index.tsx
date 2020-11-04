import * as React from "react"
import styles from "./range.module.scss"

interface Props {
    label: string
    onChange(event: React.FormEvent<HTMLInputElement>): void
}

const Button: React.FunctionComponent<Props> = props => {
    return (
        <div className={styles.range}>
            <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="100"
                onChange={props.onChange}
            />
            <label htmlFor="volume">{props.label}</label>
        </div>
    )
}

Button.defaultProps = {} as Partial<Props>

export default Button
