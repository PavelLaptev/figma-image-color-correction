import * as React from "react"
import styles from "./app.module.scss"
//
import Range from "./components/Range"

// Convert Image to the ArrayBuffer type
const imageToArrayBuffer = (
    canvas: HTMLCanvasElement
): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) =>
        canvas.toBlob(async d => {
            if (d) {
                const result = new FileReader()
                result.addEventListener("loadend", () => {
                    resolve(new Uint8Array(result.result as ArrayBuffer))
                })
                result.addEventListener("error", e => {
                    reject(e)
                })
                result.readAsArrayBuffer(d)
            } else {
                reject(new Error("Expected toBlob() to be defined"))
            }
        })
    )
}

// Application
const App = ({}) => {
    const [imageData, setImageData] = React.useState(null)

    const canvasRef = React.useRef(null)
    const saturationRef = React.useRef(null)
    const HUERef = React.useRef(null)
    const contrastRef = React.useRef(null)
    const brightnessRef = React.useRef(null)

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
        let ctx = c.getContext("2d")
        let img = new Image()
        img.src = imageData

        img.onload = () => {
            ctx.clearRect(0, 0, c.width, c.width)
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
        }

        const render = () => {
            ctx.clearRect(0, 0, c.width, c.height)
            ctx.globalCompositeOperation = "source-over"
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

            ctx.filter = `saturate(${saturationRef.current.value}%) 
            hue-rotate(${HUERef.current.value}deg) 
            contrast(${contrastRef.current.value}%)
            brightness(${brightnessRef.current.value}%)`

            // imageToArrayBuffer(c).then(bytes => {
            //     console.log(bytes)
            // })
            console.log("sd")
        }

        saturationRef.current.addEventListener("change", render)
        HUERef.current.addEventListener("change", render)
        contrastRef.current.addEventListener("change", render)
        brightnessRef.current.addEventListener("change", render)
    }, [[imageData]])

    return (
        <section className={styles.app}>
            <canvas ref={canvasRef} className={styles.previewSection} />
            <Range
                id="saturation-range"
                label="Saturation"
                reference={saturationRef}
                value={100}
                max={200}
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
                max={200}
            />
            <Range
                id="contrast-range"
                label="Brightness"
                reference={brightnessRef}
                value={100}
                max={200}
            />
            <button>save settings</button>
        </section>
    )
}

export default App
