import * as React from "react"
import styles from "./styles.module.scss"

interface Props {
    id?: string
    labels?: Array<string>
    switch?: boolean
    onChange?: (e) => void
}

const Switcher = React.forwardRef(
    (props: Props, ref?: React.Ref<HTMLFormElement>) => {
        const [selectedRadio, setSelectedRadio] = React.useState(
            props.labels[0]
        )
        const [thumbOffset, setThumbOffset] = React.useState(0)

        const handleChange = e => {
            setSelectedRadio(e.target.getAttribute("data-label"))
            setThumbOffset(e.target.offsetLeft)
            props.onChange(e)
        }

        let radioButtons = props.labels.map((item, i) => {
            return (
                <div
                    className={styles.item}
                    key={item}
                    onClick={handleChange}
                    data-label={props.labels[i]}
                >
                    <label className={styles.label} htmlFor={props.labels[i]}>
                        {item}
                    </label>
                </div>
            )
        })

        return (
            <form ref={ref} className={styles.wrap} data-label={selectedRadio}>
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
    }
)

Switcher.defaultProps = {
    reference: null,
    switch: false,
    labels: ["Off", "On"],
} as Partial<Props>

export default Switcher
