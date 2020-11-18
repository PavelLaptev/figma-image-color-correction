import * as React from "react"
import styles from "./adjustsection.module.scss"

interface Props {
    title?: string
    show?: boolean
}

const AdjustSection: React.FunctionComponent<Props> = props => {
    return (
        <div className={styles.wrap}>
            <h2 className={styles.title}>{props.title}</h2>
            {props.children}
        </div>
    )
}

AdjustSection.defaultProps = {
    title: "Section Title",
    show: false,
} as Partial<Props>

export default AdjustSection
