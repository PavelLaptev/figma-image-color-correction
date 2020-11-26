import * as React from "react"
import styles from "./app.module.scss"
import fx from "../glfx/glfx"
//
import { imageToArrayBuffer, calculateAspectRatioFit } from "./utils"
import AdjustSection from "./components/AdjustSection"
import Tools from "./components/Tools"
import ControlsContainer from "./components/ControlsContainer"
import Range from "./components/Range"
import Switcher from "./components/Switcher"

const toolsArray = [
    "brightnes-contrast",
    "hue",
    "channels",
    "exposure",
    "gamma",
    "blur",
    "lens-blur",
    "sharp",
    "vibrance",
    "invert",
    "mirror",
    "noise",
    "dotted",
    "halftone",
]

// Application
const App = ({}) => {
    const [imageData, setImageData] = React.useState(null)
    const [currentTool, setCurrentTool] = React.useState(toolsArray[12])
    const canvasRef = React.useRef(null)

    const applyRef = React.useRef(null)

    // RANGES REFS
    // Brightness and contrast
    const BrightnessRef = React.useRef(null)
    const ContrastRef = React.useRef(null)
    // HUE and Saturation
    const hueRef = React.useRef(null)
    const saturationRef = React.useRef(null)
    // Channels
    const redChannelRef = React.useRef(null)
    const greenChannelRef = React.useRef(null)
    const blueChannelRef = React.useRef(null)
    // Exposure
    const exposureRef = React.useRef(null)
    // Gamma
    const gammaRef = React.useRef(null)
    // Blur
    const blurRef = React.useRef(null)
    // Lens Blur
    const radiusLensBlurRef = React.useRef(null)
    const brightnessLensBlurRef = React.useRef(null)
    const angleLensBlurRef = React.useRef(null)
    // Sharpen
    const sharpenRadiusRef = React.useRef(null)
    const sharpenStrengthRef = React.useRef(null)
    // vibrance
    const vibranceRef = React.useRef(null)
    // Invert
    const invertRef = React.useRef(null)
    // Mirror
    const mirrorRef = React.useRef(null)
    // noise
    const noiseRef = React.useRef(null)
    const noiseToneRef = React.useRef(null)
    // Dotted
    const dottInitRef = React.useRef(null)
    const dottAngleRef = React.useRef(null)
    const dottSizeRef = React.useRef(null)

    const refsRangesArray = [
        BrightnessRef,
        ContrastRef,
        hueRef,
        saturationRef,
        redChannelRef,
        greenChannelRef,
        blueChannelRef,
        exposureRef,
        gammaRef,
        blurRef,
        radiusLensBlurRef,
        brightnessLensBlurRef,
        angleLensBlurRef,
        sharpenRadiusRef,
        sharpenStrengthRef,
        vibranceRef,
        invertRef,
        mirrorRef,
        noiseRef,
        noiseToneRef,
        dottInitRef,
        dottAngleRef,
        dottSizeRef,
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
                .brightnessContrast(
                    Number(BrightnessRef.current.value / 100),
                    Number(ContrastRef.current.value / 100)
                )
                .hueSaturation(
                    Number(hueRef.current.value / 100),
                    Number(saturationRef.current.value / 100)
                )
                .adjustchannels(
                    redChannelRef.current.value / 100,
                    greenChannelRef.current.value / 100,
                    blueChannelRef.current.value / 100
                )
                .exposure(exposureRef.current.value / 100)
                .gamma(gammaRef.current.value / 100)
                .triangleBlur(Number(blurRef.current.value))
                .lensBlur(
                    Number(radiusLensBlurRef.current.value),
                    Number(brightnessLensBlurRef.current.value / 10),
                    Number(angleLensBlurRef.current.value / 100)
                )
                .unsharpMask(
                    Number(sharpenRadiusRef.current.value),
                    Number(sharpenStrengthRef.current.value)
                )
                .vibrance(vibranceRef.current.value / 100)
                .invertColor(invertRef.current.checked)
                .mirror(mirrorRef.current.checked)
                .noise(
                    Number(noiseRef.current.value) / 100,
                    Number(noiseToneRef.current.value) / 100
                )
                .dotScreen(
                    dottInitRef.current.checked,
                    0,
                    0.5,
                    Number(dottAngleRef.current.value),
                    Number(dottSizeRef.current.value)
                )
                .update()
        }

        const drawCanvas = () => {
            let wRatio = calculateAspectRatioFit(
                image.width,
                image.height,
                408,
                300
            ).width
            let hRatio = calculateAspectRatioFit(
                image.width,
                image.height,
                408,
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

            // draw our canvas to the new one
            addEffectsToCanvas(finalFXCanvas)

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

            <AdjustSection
                title="Brightness and contrast"
                show={currentTool === toolsArray[0] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="Brightness"
                        reference={BrightnessRef}
                        value={0}
                        max={80}
                    />
                    <Range
                        label="Contrast"
                        reference={ContrastRef}
                        value={0}
                        min={-80}
                        max={80}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="HUE and Saturation"
                show={currentTool === toolsArray[1] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="HUE"
                        reference={hueRef}
                        value={0}
                        min={-99}
                        max={99}
                    />
                    <Range
                        label="Saturation"
                        reference={saturationRef}
                        value={0}
                        min={-99}
                        max={99}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Channels"
                show={currentTool === toolsArray[2] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        reference={redChannelRef}
                        value={0}
                        min={-100}
                        max={100}
                        color="FC4853"
                    />
                    <Range
                        reference={greenChannelRef}
                        value={0}
                        min={-99}
                        max={99}
                        color="63F39D"
                    />
                    <Range
                        reference={blueChannelRef}
                        value={0}
                        min={-99}
                        max={99}
                        color="1D6AFF"
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Exposure"
                show={currentTool === toolsArray[3] ? true : false}
            >
                <ControlsContainer>
                    <Range reference={exposureRef} value={0} max={100} />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Gamma"
                show={currentTool === toolsArray[4] ? true : false}
            >
                <ControlsContainer>
                    <Range reference={gammaRef} value={100} max={200} />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Blur"
                show={currentTool === toolsArray[5] ? true : false}
            >
                <ControlsContainer>
                    <Range reference={blurRef} value={0} max={100} />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Lens Blur"
                show={currentTool === toolsArray[6] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="Radius"
                        reference={radiusLensBlurRef}
                        value={0}
                        max={200}
                    />
                    <Range
                        label="Brightness"
                        reference={brightnessLensBlurRef}
                        value={100}
                        max={100}
                    />
                    <Range
                        label="Angle"
                        reference={angleLensBlurRef}
                        value={45}
                        max={300}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Sharpen"
                show={currentTool === toolsArray[7] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="Radius"
                        reference={sharpenRadiusRef}
                        value={5}
                        max={10}
                    />
                    <Range
                        label="Strength"
                        reference={sharpenStrengthRef}
                        value={0}
                        max={10}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Vibrance"
                show={currentTool === toolsArray[8] ? true : false}
            >
                <ControlsContainer>
                    <Range reference={vibranceRef} value={0} max={100} />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Invert Colors"
                show={currentTool === toolsArray[9] ? true : false}
            >
                <ControlsContainer>
                    <Switcher reference={invertRef} />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Mirror"
                show={currentTool === toolsArray[10] ? true : false}
            >
                <ControlsContainer>
                    <Switcher reference={mirrorRef} />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Noise"
                show={currentTool === toolsArray[11] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="Strength"
                        reference={noiseRef}
                        value={0}
                        max={100}
                    />
                    <Range
                        label="Tone"
                        reference={noiseToneRef}
                        value={50}
                        max={100}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Dottet"
                show={currentTool === toolsArray[12] ? true : false}
            >
                <ControlsContainer>
                    <ControlsContainer height={"32px"} margin={"8px"}>
                        <Switcher reference={dottInitRef} />
                    </ControlsContainer>
                    <ControlsContainer
                        height={"calc(100% - 32px)"}
                        margin={"0"}
                    >
                        <Range
                            label="Angle"
                            reference={dottAngleRef}
                            value={1}
                            max={100}
                        />
                        <Range
                            label="Size"
                            reference={dottSizeRef}
                            value={10}
                            max={100}
                        />
                    </ControlsContainer>
                </ControlsContainer>
            </AdjustSection>

            <Tools
                tools={toolsArray}
                onChange={e => setCurrentTool(e.target.value)}
            />

            <button ref={applyRef}>apply changes</button>
            <button>save settings</button>
        </section>
    )
}

export default App
