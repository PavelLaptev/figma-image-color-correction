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
                onMouseDown={() => {
                    setToggle(!toggle)
                }}
                className={toggle ? styles.activeButton : null}
            />
            <div
                className={`${styles.container} ${
                    toggle ? styles.activeMenu : null
                }`}
            >
                <div className={`${styles.childContainer}`}>
                    <Button
                        text={"Support plugin"}
                        onMouseDown={() =>
                            parent.postMessage(
                                { pluginMessage: { type: "donate-link" } },
                                "*"
                            )
                        }
                    />
                </div>
                <div
                    className={`${styles.childContainer}`}
                    onClick={() => {
                        setToggle(false)
                    }}
                >
                    {props.children}
                </div>
                <div
                    onClick={() => {
                        setToggle(false)
                    }}
                    className={`${styles.back}`}
                />
            </div>
        </div>
    )
}

Dropdown.defaultProps = {
    text: "Dropdown",
    icon: null,
} as Partial<Props>

export default Dropdown
