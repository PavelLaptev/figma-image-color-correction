import * as React from "react"
import { fabric } from "fabric"
import styles from "./app.module.scss"
//
// import { imageToArrayBuffer } from "./utils"
// import Range from "./components/Range"

// Application
const App = ({}) => {
    const [canvas, setCanvas] = React.useState(null)
    const canvasRef = React.useRef(null)
    // const [imageData, setImageData] = React.useState(null)

    React.useEffect(() => {
        console.log(canvasRef.current)
        const canvas = new fabric.Canvas("canvas", {
            width: 300,
            height: 160,
            backgroundColor: "pink",
        })

        var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: "red",
            width: 20,
            height: 20,
        })

        // "add" rectangle onto canvas
        canvas.add(rect)
        // addRect(canvas)
        // let img = new Image()
        // img.src = imageData

        // img.onload = res => {
        //     addImg(canvas, res)
        // }

        // onmessage = event => {
        //     let imgData = event.data.pluginMessage.data

        //     let base64Data =
        //         "data:image/png;base64," +
        //         btoa(
        //             new Uint8Array(imgData).reduce(function(data, byte) {
        //                 return data + String.fromCharCode(byte)
        //             }, "")
        //         )

        //     setImageData(base64Data)
        // }
    }, [])

    // RETURN
    return (
        <section className={styles.app}>
            <canvas
                ref={canvasRef}
                id="canvas"
                className={styles.previewSection}
            />
            <h2>Invert Channels</h2>
            <button>save settings</button>
        </section>
    )
}

export default App
