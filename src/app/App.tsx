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

    const invertRedRef = React.useRef(null)
    const invertGreenRef = React.useRef(null)
    const invertBlueRef = React.useRef(null)
    //
    const contrastRef = React.useRef(null)
    const brightnessRef = React.useRef(null)
    //
    const channelRedRef = React.useRef(null)
    const channelGreenRef = React.useRef(null)
    const channelBlueRef = React.useRef(null)

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
        const adjustChannels = data => {
            for (var i = 0; i < data.length; i += 4) {
                data[i] += 255 * (channelRedRef.current.value / 100)
                data[i + 1] += 255 * (channelGreenRef.current.value / 100)
                data[i + 2] += 255 * (channelBlueRef.current.value / 100)
            }
        }

        const applyBrightness = (data, brightness) => {
            for (var i = 0; i < data.length; i += 4) {
                data[i] += 255 * (brightness / 100)
                data[i + 1] += 255 * (brightness / 100)
                data[i + 2] += 255 * (brightness / 100)
            }
        }

        const invertColors = data => {
            for (var i = 0; i < data.length; i += 4) {
                data[i] = data[i] ^ invertRedRef.current.value // Invert Red
                data[i + 1] = data[i + 1] ^ invertGreenRef.current.value // Invert Green
                data[i + 2] = data[i + 2] ^ invertBlueRef.current.value // Invert Blue
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
            applyContrast(imageData.data, contrastRef.current.value / 1.1)
            applyBrightness(imageData.data, brightnessRef.current.value)
            adjustChannels(imageData.data)
            ctx.putImageData(imageData, 0, 0)
        }

        // Render

        const render = () => {
            drawNewImage()
            addEffect()
            // ctx.filter = `saturate(${saturationRef.current.value}%)
            // hue-rotate(${HUERef.current.value}deg)
            // contrast(${contrastRef.current.value}%)
            // brightness(${contrastRef.current.value}%)`
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
        //
        invertRedRef.current.addEventListener("change", render)
        invertGreenRef.current.addEventListener("change", render)
        invertBlueRef.current.addEventListener("change", render)
        //
        contrastRef.current.addEventListener("change", render)
        brightnessRef.current.addEventListener("change", render)
        //
        channelRedRef.current.addEventListener("change", render)
        channelGreenRef.current.addEventListener("change", render)
        channelBlueRef.current.addEventListener("change", render)

        return () => applyRef.current.removeEventListener("click", applyResults)
    }, [[]])

    // RETURN
    return (
        <section className={styles.app}>
            <canvas ref={canvasRef} className={styles.previewSection} />
            <h2>Invert Channels</h2>
            <Range
                id="invert-range-red"
                label="Red"
                reference={invertRedRef}
                value={0}
                max={255}
            />
            <Range
                id="invert-range-green"
                label="Green"
                reference={invertGreenRef}
                value={0}
                max={255}
            />
            <Range
                id="invert-range-blue"
                label="Blue"
                reference={invertBlueRef}
                value={0}
                max={255}
            />
            <hr />
            <Range
                id="contrast-range"
                label="Contrast"
                reference={contrastRef}
                value={0}
                min={-100}
                max={100}
                step={1}
            />
            <hr />
            <Range
                id="brightness-range"
                label="Brightness"
                reference={brightnessRef}
                value={0}
                min={-100}
                max={100}
                step={1}
            />
            <hr />
            <h2>Channels Manipulation</h2>
            <Range
                id="channel-range-red"
                label="Red"
                reference={channelRedRef}
                value={0}
                min={-100}
                max={0}
            />
            <Range
                id="channel-range-green"
                label="Green"
                reference={channelGreenRef}
                value={0}
                min={-100}
                max={0}
            />
            <Range
                id="channel-range-blue"
                label="Blue"
                reference={channelBlueRef}
                value={0}
                min={-100}
                max={0}
            />
            <button ref={applyRef}>apply</button>
            <button>save settings</button>
        </section>
    )
}

export default App
