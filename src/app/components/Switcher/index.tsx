import * as React from "react"
import styles from "./styles.module.scss"

interface Props {
    id?: string
    labels?: Array<string>
    switch?: boolean
    reference?: React.Ref<HTMLFormElement>
    onChange?: (e) => void
}

const Switcher: React.FunctionComponent<Props> = props => {
    const [selectedRadio, setSelectedRadio] = React.useState(props.labels[0])
    const [thumbOffset, setThumbOffset] = React.useState(0)

    const handleChange = e => {
        // console.log(e.target)
        // e.preventDefault()
        setSelectedRadio(e.target.getAttribute("data-label"))
        setThumbOffset(e.target.offsetLeft)
        props.onChange(e)
    }

    // const handleFormChange = e => {
    //     // console.log(e.currentTarget.getAttribute("data-label"))
    //     setSelectedRadio(e.target.value)
    //     console.log(e.target.value)
    // }

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
                <input
                    className={styles.radio}
                    id={props.labels[i]}
                    type="radio"
                    checked={selectedRadio === props.labels[i] ? true : false}
                    onChange={() => {}}
                />
            </div>
        )
    })

    return (
        <form
            ref={props.reference}
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
}

Switcher.defaultProps = {
    reference: null,
    switch: false,
    labels: ["Off", "On"],
} as Partial<Props>

export default Switcher
