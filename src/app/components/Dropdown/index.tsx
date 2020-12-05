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
        <div
            className={`${props.className} ${styles.wrap}`}
            onBlur={() => {
                setToggle(false)
            }}
        >
            <Button icon={props.icon} onClick={() => setToggle(!toggle)} />
            <div
                style={{ display: toggle ? "flex" : "none" }}
                className={`${styles.container}`}
                onMouseDown={() => {
                    setToggle(false)
                }}
            >
                <div className={`${styles.childContainer}`}>
                    <Button
                        text={"Support Plugin"}
                        onClick={() =>
                            parent.postMessage(
                                { pluginMessage: { type: "donate-link" } },
                                "*"
                            )
                        }
                    />
                </div>
                <div className={`${styles.childContainer}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

Dropdown.defaultProps = {
    text: "Dropdown",
    icon: null,
} as Partial<Props>

export default Dropdown
