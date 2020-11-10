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

        // Filters

        const invertColors = data => {
            for (var i = 0; i < data.length; i += 4) {
                data[i] = data[i] ^ saturationRef.current.value // Invert Red
                data[i + 1] = data[i + 1] ^ HUERef.current.value // Invert Green
                data[i + 2] = data[i + 2] ^ contrastRef.current.value // Invert Blue
            }
        }

        const truncateColor = value => {
            if (value < 0) {
                value = 0
            } else if (value > 255) {
                value = 255
            }

            return value
        }

        const applyContrast = (data, contrastVal) => {
            var factor =
                (259.0 * (contrastVal + 255.0)) /
                (255.0 * (259.0 - contrastVal))

            for (var i = 0; i < data.length; i += 4) {
                data[i] = truncateColor(factor * (data[i] - 128.0) + 128.0)
                data[i + 1] = truncateColor(
                    factor * (data[i + 1] - 128.0) + 128.0
                )
                data[i + 2] = truncateColor(
                    factor * (data[i + 2] - 128.0) + 128.0
                )
            }
        }

        const addEffect = () => {
            let imageData = ctx.getImageData(0, 0, c.width, c.height)
            invertColors(imageData.data)
            applyContrast(imageData.data, brightnessRef.current.value / 2)
            ctx.putImageData(imageData, 0, 0)
        }

        // Render

        const render = () => {
            drawNewImage()
            addEffect()
            // ctx.filter = `saturate(${saturationRef.current.value}%)
            // hue-rotate(${HUERef.current.value}deg)
            // contrast(${contrastRef.current.value}%)
            // brightness(${brightnessRef.current.value}%)`
        }

        img.onload = () => {
            render()
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
            <h2>Invert Channels</h2>
            <Range
                id="saturation-range"
                label="Red"
                reference={saturationRef}
                value={0}
                max={255}
            />
            <Range
                id="hue-range"
                label="Green"
                reference={HUERef}
                value={0}
                max={255}
            />
            <Range
                id="contrast-range"
                label="Blue"
                reference={contrastRef}
                value={0}
                max={255}
            />
            <hr />
            <Range
                id="contrast-range"
                label="Contrast"
                reference={brightnessRef}
                value={0}
                max={300}
                step={1}
            />
            <button ref={applyRef}>apply</button>
            <button>save settings</button>
        </section>
    )
}

export default App
