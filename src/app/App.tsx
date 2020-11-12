import * as React from "react"
import styles from "./app.module.scss"
import fx from "glfx"
//
// import { imageToArrayBuffer } from "./utils"
// import Range from "./components/Range"

const drawCanvas = (c, ctx, source) => {
    let hRatio = c.width / source.width
    let vRatio = c.height / source.height
    let ratio = Math.min(hRatio, vRatio)

    ctx.drawImage(
        source,
        c.width / 2 - (source.width * ratio) / 2,
        0,
        source.width * ratio,
        source.height * ratio
    )
}

// Application
const App = ({}) => {
    const [imageData, setImageData] = React.useState(null)
    const canvasRef = React.useRef(null)

    React.useEffect(() => {
        const c = canvasRef.current
        c.width = 300 * 2
        c.height = 150 * 2
        const ctx = c.getContext("2d")

        const image = new Image()

        image.onload = () => {
            const fxc = fx.canvas()
            fxc.width = 300
            fxc.height = 150
            const texture = fxc.texture(image)
            // document.body.appendChild(fxc)
            // ctx.drawImage(image, 0, 0)
            fxc.draw(texture)
                .triangleBlur(20)
                .update()

            ctx.drawImage(fxc, 0, 0)

            // const c = canvasRef.current
            // c.width = 300 * 2
            // c.height = 150 * 2
            // const ctx = c.getContext("2d")
            // setImageData(image)
            // drawCanvas(c, ctx, image)
        }
        image.src = imageData

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

        // let c = canvasRef.current
        // c.width = 300 * 2
        // c.height = 150 * 2
        // let ctx = c.getContext("2d")
        // let img = new Image()
        // img.src = sourceImg

        // img.onload = () => {}
    }, [imageData])

    // RETURN
    return (
        <section className={styles.app}>
            <canvas ref={canvasRef} className={styles.previewSection} />
            <h2>Invert Channels</h2>

            <button>save settings</button>
        </section>
    )
}

export default App
