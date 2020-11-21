import * as React from "react"
import styles from "./styles.module.scss"

import ToolButton from "../ToolButton"

interface Props {}

const tools = [
    "brightnes-contrast",
    "hue",
    "channels",
    "exposure",
    "gamma",
    "blur",
    "lens-blur",
    "sharp",
    "vibrance",
    "invert",
    "mirror",
    "dotted",
    "bulge",
    "noise",
]

const Tools: React.FunctionComponent<Props> = () => {
    const [selectedRadio, setSelectedRadio] = React.useState(null)

    const handleChange = e => {
        console.log(e.target.value)
        setSelectedRadio(e.target.value)
    }

    return (
        <form className={styles.wrap} onChange={handleChange}>
            {tools.map((item, i) => {
                return (
                    <ToolButton
                        icon={tools[i]}
                        className={styles.button}
                        key={`${item}-icon-button`}
                        checked={selectedRadio === tools[i] ? true : false}
                    />
                )
            })}
        </form>
    )
}

Tools.defaultProps = {} as Partial<Props>

export default Tools
