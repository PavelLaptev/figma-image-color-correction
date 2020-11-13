import * as React from "react"
import styles from "./app.module.scss"
import fx from "glfx"
//
import { imageToArrayBuffer } from "./utils"
import Range from "./components/Range"

// Application
const App = ({}) => {
    const [imageData, setImageData] = React.useState(null)
    const canvasRef = React.useRef(null)

    const applyRef = React.useRef(null)

    const blurRef = React.useRef(null)
    const sharpenRadiusRef = React.useRef(null)
    const sharpenStrengthRef = React.useRef(null)

    React.useEffect(() => {
        let c = canvasRef.current
        let ctx = c.getContext("2d")

        let fxc = fx.canvas()
        fxc.width = c.width
        fxc.height = c.height

        const image = new Image()
        image.src = imageData

        const drawCanvas = () => {
            console.log("s")
            c.width = 300 * 2
            c.height = (image.height * c.width) / image.width
            ctx.clearRect(0, 0, c.width, c.height)

            fxc.draw(fxc.texture(image))
                .triangleBlur(Number(blurRef.current.value))
                .unsharpMask(
                    Number(sharpenRadiusRef.current.value),
                    Number(sharpenStrengthRef.current.value)
                )
                .update()

            ctx.drawImage(fxc, 0, 0, c.width, c.height)
        }

        image.onload = () => {
            drawCanvas()

            blurRef.current.addEventListener("change", drawCanvas)
            sharpenRadiusRef.current.addEventListener("change", drawCanvas)
            sharpenStrengthRef.current.addEventListener("change", drawCanvas)
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

        const resizeAndExport = function() {
            // create a new canvas
            let finalCanvas = canvasRef.current
            let finalCanvasCtx = finalCanvas.getContext("2d")

            finalCanvas.width = image.width
            finalCanvas.height = image.height

            let finalFXCanvas = fx.canvas()
            finalFXCanvas.width = image.width
            finalFXCanvas.height = image.height

            // draw our canvas to the new one`
            finalFXCanvas
                .draw(finalFXCanvas.texture(image))
                .triangleBlur(Number(blurRef.current.value))
                .unsharpMask(
                    Number(sharpenRadiusRef.current.value),
                    Number(sharpenStrengthRef.current.value)
                )
                .update()

            // return the resized canvas dataURL
            finalCanvasCtx.drawImage(
                finalFXCanvas,
                0,
                0,
                image.width,
                image.height
            )
            return finalFXCanvas
        }

        // img.onload = () => {}
        const applyResults = () => {
            imageToArrayBuffer(resizeAndExport()).then(bytes => {
                parent.postMessage(
                    { pluginMessage: { type: "img", bytes } },
                    "*"
                )
            })
        }

        applyRef.current.addEventListener("click", applyResults)

        return () => {
            blurRef.current.removeEventListener("click", drawCanvas)
            sharpenRadiusRef.current.removeEventListener("change", drawCanvas)
            sharpenStrengthRef.current.removeEventListener("change", drawCanvas)
            applyRef.current.removeEventListener("click", applyResults)
        }
    }, [imageData])

    // RETURN
    return (
        <section className={styles.app}>
            <canvas ref={canvasRef} className={styles.previewSection} />
            <h2>blur</h2>
            <Range id="blue-range" reference={blurRef} value={0} max={100} />
            <h2>Sharpen</h2>
            <Range
                id="sharpen-radius-range"
                label="Radius"
                reference={sharpenRadiusRef}
                value={5}
                max={10}
            />
            <Range
                id="sharpen-strength-range"
                label="Strength"
                reference={sharpenStrengthRef}
                value={0}
                max={10}
            />
            <button ref={applyRef}>apply changes</button>
            <button>save settings</button>
        </section>
    )
}

export default App
