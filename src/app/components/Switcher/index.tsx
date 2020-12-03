import * as React from "react"
import styles from "./styles.module.scss"

interface Props {
    id?: string
    labels?: Array<string>
    switch?: boolean
    onClick?: (e) => void
}

interface RefObject {
    reset: (val) => void
}

const Switcher = React.forwardRef((props: Props, ref: React.Ref<RefObject>) => {
    const [selectedRadio, setSelectedRadio] = React.useState(props.labels[0])
    const [thumbOffset, setThumbOffset] = React.useState(0)

    React.useImperativeHandle(ref, () => ({
        reset(val) {
            setSelectedRadio(val)
        },
    }))

    const handleClick = e => {
        setSelectedRadio(e.target.getAttribute("data-label"))
        setThumbOffset(e.target.offsetLeft)
        props.onClick(e)
    }

    let radioButtons = props.labels.map((item, i) => {
        return (
            <div
                className={styles.item}
                key={item}
                onClick={handleClick}
                data-label={props.labels[i]}
            >
                <label className={styles.label} htmlFor={props.labels[i]}>
                    {item}
                </label>
            </div>
        )
    })

    return (
        <form
            ref={ref as any}
            className={styles.wrap}
            data-label={selectedRadio}
        >
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
    switch: false,
    labels: ["Off", "On"],
} as Partial<Props>

export default Switcher
