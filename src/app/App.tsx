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

    const [saturationVal, setSaturationVal] = React.useState(100)
    const [hueVal, setHueVal] = React.useState(0)
    const [contrastVal, setContrastVal] = React.useState(100)
    const [brightnessVal, setBrightnessVal] = React.useState(100)

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

        img.onload = () => {
            drawNewImage()
            console.log(img.width)
        }

        drawNewImage()
        ctx.filter = `saturate(${saturationVal}%)
            hue-rotate(${hueVal}deg)
            contrast(${contrastVal}%)
            brightness(${brightnessVal}%)`

        const applyResults = () => {
            console.log("s")
            imageToArrayBuffer(canvasRef.current).then(bytes => {
                parent.postMessage(
                    { pluginMessage: { type: "img", bytes } },
                    "*"
                )
            })
        }

        applyRef.current.addEventListener("click", applyResults)

        return () => applyRef.current.removeEventListener("click", applyResults)
    }, [[]])

    // SET INPUT STATES
    const handleSaturation = e => {
        setSaturationVal(e.target.value)
    }
    const handleHue = e => {
        setHueVal(e.target.value)
    }
    const handleContrast = e => {
        setContrastVal(e.target.value)
    }
    const handleBrightness = e => {
        setBrightnessVal(e.target.value)
    }

    // RETURN
    return (
        <section className={styles.app}>
            <canvas ref={canvasRef} className={styles.previewSection} />
            <Range
                id="saturation"
                label="Saturation"
                value={saturationVal}
                max={200}
                onChange={handleSaturation}
            />
            <Range
                id="hue"
                label="HUE"
                value={hueVal}
                max={360}
                onChange={handleHue}
            />
            <Range
                id="contrast"
                label="Contrast"
                value={contrastVal}
                max={200}
                onChange={handleContrast}
            />
            <Range
                id="brightness"
                label="Brightness"
                value={brightnessVal}
                max={200}
                onChange={handleBrightness}
            />
            <button ref={applyRef}>apply</button>
            <button>save settings</button>
        </section>
    )
}

export default App
