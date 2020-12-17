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
    const [thumbOffset, setThumbOffset] = React.useState(0)

    React.useImperativeHandle(ref, () => ({
        reset(val) {
            props.labels.map((item, i) => {
                if (item === val) {
                    setThumbOffset((100 / props.labels.length) * i)
                }
            })
        },
        getLabels() {
            return props.labels
        },
    }))

    const handleClick = e => {
        props.labels.map((item, i) => {
            if (item === e.target.textContent) {
                setThumbOffset((100 / props.labels.length) * i)
            }
        })
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
                    left: `${thumbOffset}%`,
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
