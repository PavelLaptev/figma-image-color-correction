import * as React from "react"
import styles from "./app.module.scss"
//
import { imageToArrayBuffer } from "./utils"
import Range from "./components/Range"

// Application
const App = ({}) => {
    const [imageData, setImageData] = React.useState(null)

    const canvasRef = React.useRef(null)
    const applyRef = React.useRef(null)

    const saturationRef = React.useRef(null)
    const HUERef = React.useRef(null)
    const contrastRef = React.useRef(null)
    const brightnessRef = React.useRef(null)

    React.useEffect(() => {
        let c = canvasRef.current
        c.width = 300 * 2
        c.height = 150 * 2
        let ctx = c.getContext("2d")
        let img = new Image()
        img.src = imageData

        const drawNewImage = () => {
            let hRatio = c.width / img.width
            let vRatio = c.height / img.height
            let ratio = Math.min(hRatio, vRatio)

            ctx.clearRect(0, 0, c.width, c.height)
            ctx.drawImage(
                img,
                c.width / 2 - (img.width * ratio) / 2,
                0,
                img.width * ratio,
                img.height * ratio
            )
        }

        const render = () => {
            drawNewImage()
            ctx.filter = `saturate(${saturationRef.current.value}%)
            hue-rotate(${HUERef.current.value}deg)
            contrast(${contrastRef.current.value}%)
            brightness(${brightnessRef.current.value}%)`
        }

        img.onload = () => {
            render()
            console.log(img.width)
        }

        const applyResults = () => {
            console.log("s")
            imageToArrayBuffer(canvasRef.current).then(bytes => {
                parent.postMessage(
                    { pluginMessage: { type: "img", bytes } },
                    "*"
                )
            })
        }

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

        applyRef.current.addEventListener("click", applyResults)

        saturationRef.current.addEventListener("change", render)
        HUERef.current.addEventListener("change", render)
        contrastRef.current.addEventListener("change", render)
        brightnessRef.current.addEventListener("change", render)

        return () => applyRef.current.removeEventListener("click", applyResults)
    }, [[]])

    // RETURN
    return (
        <section className={styles.app}>
            <canvas ref={canvasRef} className={styles.previewSection} />
            <Range
                id="saturation-range"
                label="Saturation"
                reference={saturationRef}
                value={100}
                max={300}
            />
            <Range
                id="hue-range"
                label="HUE"
                reference={HUERef}
                value={0}
                max={360}
            />
            <Range
                id="contrast-range"
                label="Contrast"
                reference={contrastRef}
                value={100}
                max={300}
            />
            <Range
                id="contrast-range"
                label="Brightness"
                reference={brightnessRef}
                value={100}
                max={300}
            />
            <button ref={applyRef}>apply</button>
            <button>save settings</button>
        </section>
    )
}

export default App
