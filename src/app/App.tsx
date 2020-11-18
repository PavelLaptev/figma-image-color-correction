import * as React from "react"
import styles from "./app.module.scss"
import fx from "../glfx/glfx"
//
import { imageToArrayBuffer, calculateAspectRatioFit } from "./utils"
import AdjustSection from "./components/AdjustSection"
import RangeContainer from "./components/RangeContainer"
import Range from "./components/Range"

// Application
const App = ({}) => {
    const [imageData, setImageData] = React.useState(null)
    // const [currentItem, setCurrentItem] = React.useState(null)
    const canvasRef = React.useRef(null)

    const applyRef = React.useRef(null)

    // RANGES REFS
    const BrightnessRef = React.useRef(null)
    const ContrastRef = React.useRef(null)
    //
    const blurRef = React.useRef(null)
    //
    const sharpenRadiusRef = React.useRef(null)
    const sharpenStrengthRef = React.useRef(null)

    const refsRangesArray = [
        BrightnessRef,
        ContrastRef,
        blurRef,
        sharpenRadiusRef,
        sharpenStrengthRef,
    ]

    React.useEffect(() => {
        let c = canvasRef.current
        let ctx = c.getContext("2d")

        let fxc = fx.canvas()
        fxc.width = c.width
        fxc.height = c.height

        const image = new Image()
        image.src = imageData

        const addEffectsToCanvas = canvas => {
            canvas
                .draw(canvas.texture(image))
                .triangleBlur(Number(blurRef.current.value))
                .brightnessContrast(
                    Number(BrightnessRef.current.value / 100),
                    Number(ContrastRef.current.value / 100)
                )
                .unsharpMask(
                    Number(sharpenRadiusRef.current.value),
                    Number(sharpenStrengthRef.current.value)
                )
                .update()
        }

        const drawCanvas = () => {
            let wRatio = calculateAspectRatioFit(
                image.width,
                image.height,
                402,
                300
            ).width
            let hRatio = calculateAspectRatioFit(
                image.width,
                image.height,
                402,
                300
            ).height

            c.width = wRatio
            c.height = hRatio
            ctx.clearRect(0, 0, c.width, c.height)

            addEffectsToCanvas(fxc)

            ctx.drawImage(fxc, 0, 0, c.width, c.height)
        }

        const resizeAndExport = function() {
            // create a new canvas
            let finalFXCanvas = fx.canvas()
            finalFXCanvas.width = image.width
            finalFXCanvas.height = image.height
            console.log("sd")
            // draw our canvas to the new one
            addEffectsToCanvas(finalFXCanvas)

            // return the resized canvas dataURL
            // finalCanvasCtx.drawImage(
            //     finalFXCanvas,
            //     0,
            //     0,
            //     image.width,
            //     image.height
            // )
            return finalFXCanvas
        }

        image.onload = () => {
            drawCanvas()

            refsRangesArray.forEach(i => {
                i.current.addEventListener("change", drawCanvas)
            })
        }

        onmessage = event => {
            let imgData = event.data.pluginMessage.data

            if (imgData) {
                let base64Data =
                    "data:image/png;base64," +
                    btoa(
                        new Uint8Array(imgData).reduce(function(data, byte) {
                            return data + String.fromCharCode(byte)
                        }, "")
                    )

                setImageData(base64Data)
            } else {
                console.log("nothing selected")
            }
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
            applyRef.current.removeEventListener("click", applyResults)
            refsRangesArray.forEach(i => {
                i.current.removeEventListener("change", drawCanvas)
            })
        }
    }, [imageData])

    // RETURN
    return (
        <section className={styles.app}>
            <div className={styles.canvasWrap}>
                <canvas ref={canvasRef} className={styles.canvas} />
            </div>

            <AdjustSection title="Brightness and contrast">
                <RangeContainer>
                    <Range
                        id="brightness-range"
                        reference={BrightnessRef}
                        value={0}
                        min={-80}
                        max={80}
                    />
                    <Range
                        id="contrast-range"
                        reference={ContrastRef}
                        value={0}
                        min={-99}
                        max={99}
                    />
                </RangeContainer>
            </AdjustSection>

            <AdjustSection title="Blur">
                <RangeContainer>
                    <Range
                        id="blur-range"
                        reference={blurRef}
                        value={0}
                        max={100}
                    />
                </RangeContainer>
            </AdjustSection>

            <AdjustSection title="Sharpen">
                <RangeContainer>
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
                </RangeContainer>
            </AdjustSection>
            <button ref={applyRef}>apply changes</button>
            <button>save settings</button>
        </section>
    )
}

export default App
