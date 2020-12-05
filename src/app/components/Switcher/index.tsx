import * as React from "react"
import styles from "./styles.module.scss"

interface Props {
    id?: string
    labels?: Array<string>
    value: string
    onClick?: (e) => void
}

interface RefObject {
    reset: (val) => void
}

const Switcher = React.forwardRef((props: Props, ref: React.Ref<RefObject>) => {
    // const [selectedRadio, setSelectedRadio] = React.useState(props.value)
    const [thumbOffset, setThumbOffset] = React.useState(0)

    React.useImperativeHandle(ref, () => ({
        reset() {
            setThumbOffset(0)
        },
    }))

    const handleClick = e => {
        setThumbOffset(e.target.offsetLeft)
        props.onClick(e)
    }

    let radioButtons = props.labels.map(item => {
        return (
            <div className={styles.item} key={item} onClick={handleClick}>
                <span className={styles.label}>{item}</span>
            </div>
        )
    })

    return (
        <form ref={ref as any} className={styles.wrap}>
            {radioButtons}
            <div
                className={styles.thumb}
                style={{
                    width: `${100 / props.labels.length}%`,
                    left: `${thumbOffset}px`,
                }}
            />
        </form>
    )
})

Switcher.defaultProps = {
    reference: null,
    value: "Off",
    labels: ["Off", "On"],
} as Partial<Props>

export default Switcher
