import * as React from "react"
import styles from "./styles.module.scss"

import ToolButton from "../ToolButton"

interface Props {
    onChange?: (e) => void
    tools: Array<string>
}

const Tools: React.FunctionComponent<Props> = props => {
    const [selectedRadio, setSelectedRadio] = React.useState(props.tools[0])

    const handleChange = e => {
        setSelectedRadio(e.target.value)
        props.onChange(e)
    }

    return (
        <form className={styles.wrap} onChange={handleChange}>
            {props.tools.map((item, i) => {
                return (
                    <ToolButton
                        icon={props.tools[i]}
                        className={styles.button}
                        key={`${item}-icon-button`}
                        checked={
                            selectedRadio === props.tools[i] ? true : false
                        }
                    />
                )
            })}
        </form>
    )
}

Tools.defaultProps = {} as Partial<Props>

export default Tools
