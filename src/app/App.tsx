import * as React from "react"
import styles from "./app.module.scss"
//
import Range from "./components/Range"

// Application
const App = ({}) => {
    const [imageData, setImageData] = React.useState(null)

    const handleOnRangeChange = () => {
        console.log("sd")
    }

    React.useEffect(() => {
        onmessage = event => {
            let imgData = event.data.pluginMessage.data

            let base64Data =
                "data:image/png;base64," +
                btoa(
                    new Uint8Array(imgData).reduce(function(data, byte) {
                        return data + String.fromCharCode(byte)
                    }, "")
                )

            setImageData(base64Data)
        }
    }, [imageData])

    return (
        <section className={styles.app}>
            <div
                className={styles.previewSection}
                style={{
                    backgroundImage: `url("${imageData}")`,
                }}
            />
            <Range label="Yo" onChange={handleOnRangeChange} />
            <button>save settings</button>
        </section>
    )
}

export default App
