import * as React from "react"
import styles from "./styles.module.scss"

interface Props {
    labels?: Array<string>
    switch?: boolean
    reference?: React.Ref<HTMLInputElement>
    onClick?(event: React.FormEvent<HTMLInputElement>): void
}

const Switcher: React.FunctionComponent<Props> = props => {
    const [switchVal, setswitchVal] = React.useState(props.switch)

    const handleChange = () => {
        setswitchVal(!switchVal)
    }

    return (
        <div className={styles.wrap} data-switched={switchVal}>
            <input
                type="checkbox"
                className={`${styles.checkbox}`}
                ref={props.reference}
                onChange={handleChange}
                checked={switchVal}
            />
            <div className={styles.labels}>
                <div className={styles.label}>
                    <span>{props.labels[0]}</span>
                </div>
                <div className={styles.label}>
                    <span>{props.labels[1]}</span>
                </div>
            </div>
            <div
                className={`${styles.thumb} ${
                    !switchVal ? styles.active : null
                }`}
            ></div>
        </div>
    )
}

Switcher.defaultProps = {
    reference: null,
    switch: false,
    labels: ["Off", "On"],
} as Partial<Props>

export default Switcher
