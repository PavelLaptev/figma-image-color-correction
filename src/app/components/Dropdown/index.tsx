import * as React from "react"
import styles from "./styles.module.scss"

import Button from "../Button"

interface Props {
    className?: any
    text?: string
    icon?: string
}

const Dropdown: React.FunctionComponent<Props> = props => {
    const [toggle, setToggle] = React.useState(false)

    return (
        <div className={`${props.className} ${styles.wrap}`}>
            <Button
                icon={props.icon}
                onClick={() => setToggle(!toggle)}
                onBlur={() => setToggle(false)}
            />
            <div
                style={{ display: toggle ? "flex" : "none" }}
                className={`${styles.container}`}
            >
                {props.children}
            </div>
        </div>
    )
}

Dropdown.defaultProps = {
    text: "Dropdown",
    icon: null,
} as Partial<Props>

export default Dropdown
