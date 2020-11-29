import * as React from "react"
import styles from "./app.module.scss"
import fx from "../glfx/glfx"
//
import { imageToArrayBuffer, calculateAspectRatioFit, hexToRgb } from "./utils"
import Button from "./components/Button"
import AdjustSection from "./components/AdjustSection"
import Tools from "./components/Tools"
import ControlsContainer from "./components/ControlsContainer"
import Range from "./components/Range"
import Colorpicker from "./components/Colorpicker"
import Switcher from "./components/Switcher"

const initialSettings = {
    brightness: 0,
    contrast: 0,
    hue: 0,
    saturation: 0,
    channels: {
        r: 0,
        g: 0,
        b: 0,
    },
    exposure: 0,
    gamma: 100,
    blur: 0,
    lensblur: {
        radius: 0,
        brightness: 100,
        angle: 45,
    },
    sharpen: {
        radius: 5,
        strength: 0,
    },
    vibrance: 0,
    invert: "off",
    mirror: "off",
    noise: {
        strength: 0,
        tone: 50,
    },
    dotten: {
        type: "off",
        angle: 1,
        size: 10,
    },
    tint: {
        color: "#fc4848",
        alpha: 0,
    },
}

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
    "tint",
]

// Application
const App = ({}) => {
    const [imageData, setImageData] = React.useState(null)
    const [currentTool, setCurrentTool] = React.useState(toolsArray[0])
    // Swithers
    const [invertState, setInvertState] = React.useState("Off")
    const [mirrorState, setMirrorState] = React.useState("Off")
    const [dottedState, setDottedState] = React.useState("Off")

    // General Refs
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
    // noise
    const noiseRef = React.useRef(null)
    const noiseToneRef = React.useRef(null)
    // Dotted
    const dottAngleRef = React.useRef(null)
    const dottSizeRef = React.useRef(null)
    // Tint
    const tintRef = React.useRef(null)
    const tintAlphaRef = React.useRef(null)

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
        noiseRef,
        noiseToneRef,
        dottAngleRef,
        dottSizeRef,
        tintRef,
        tintAlphaRef,
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
                .invertColor(invertState)
                .mirror(mirrorState)
                .noise(
                    Number(noiseRef.current.value) / 100,
                    Number(noiseToneRef.current.value) / 100
                )
                .dotScreen(
                    dottedState,
                    0,
                    0.5,
                    Number(dottAngleRef.current.value),
                    Number(dottSizeRef.current.value)
                )
                .colorHalftone(
                    dottedState,
                    0,
                    0.5,
                    Number(dottAngleRef.current.value),
                    Number(dottSizeRef.current.value)
                )
                .color(
                    Number(tintAlphaRef.current.value),
                    hexToRgb(tintRef.current.value).r,
                    hexToRgb(tintRef.current.value).g,
                    hexToRgb(tintRef.current.value).b
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
    }, [imageData, invertState, mirrorState, dottedState])

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
                        ref={BrightnessRef}
                        value={initialSettings.brightness}
                        min={-100}
                        max={100}
                    />
                    <Range
                        label="Contrast"
                        ref={ContrastRef}
                        value={initialSettings.contrast}
                        min={-100}
                        max={100}
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
                        ref={hueRef}
                        value={initialSettings.hue}
                        min={-99}
                        max={99}
                    />
                    <Range
                        label="Saturation"
                        ref={saturationRef}
                        value={initialSettings.saturation}
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
                        ref={redChannelRef}
                        value={initialSettings.channels.r}
                        min={-100}
                        max={100}
                        color="#FC4853"
                    />
                    <Range
                        ref={greenChannelRef}
                        value={initialSettings.channels.g}
                        min={-99}
                        max={99}
                        color="#63F39D"
                    />
                    <Range
                        ref={blueChannelRef}
                        value={initialSettings.channels.b}
                        min={-99}
                        max={99}
                        color="#1D6AFF"
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Exposure"
                show={currentTool === toolsArray[3] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={exposureRef}
                        value={initialSettings.exposure}
                        max={100}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Gamma"
                show={currentTool === toolsArray[4] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={gammaRef}
                        value={initialSettings.gamma}
                        max={200}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Blur"
                show={currentTool === toolsArray[5] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={blurRef}
                        value={initialSettings.blur}
                        max={100}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Lens Blur"
                show={currentTool === toolsArray[6] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="Radius"
                        ref={radiusLensBlurRef}
                        value={initialSettings.lensblur.radius}
                        max={200}
                    />
                    <Range
                        label="Brightness"
                        ref={brightnessLensBlurRef}
                        value={initialSettings.lensblur.brightness}
                        max={100}
                    />
                    <Range
                        label="Angle"
                        ref={angleLensBlurRef}
                        value={initialSettings.lensblur.angle}
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
                        ref={sharpenRadiusRef}
                        value={initialSettings.sharpen.radius}
                        max={10}
                    />
                    <Range
                        label="Strength"
                        ref={sharpenStrengthRef}
                        value={initialSettings.sharpen.strength}
                        max={10}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Vibrance"
                show={currentTool === toolsArray[8] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={vibranceRef}
                        value={initialSettings.vibrance}
                        max={100}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Invert Colors"
                show={currentTool === toolsArray[9] ? true : false}
            >
                <ControlsContainer>
                    <Switcher
                        onChange={e => {
                            setInvertState(e.target.getAttribute("data-label"))
                        }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Mirror"
                show={currentTool === toolsArray[10] ? true : false}
            >
                <ControlsContainer>
                    <Switcher
                        onChange={e => {
                            setMirrorState(e.target.getAttribute("data-label"))
                        }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Noise"
                show={currentTool === toolsArray[11] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="Strength"
                        ref={noiseRef}
                        value={initialSettings.noise.strength}
                        max={100}
                    />
                    <Range
                        label="Tone"
                        ref={noiseToneRef}
                        value={initialSettings.noise.tone}
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
                        <Switcher
                            onChange={e => {
                                setDottedState(
                                    e.target.getAttribute("data-label")
                                )
                            }}
                            labels={["Off", "Dotted", "Halftone"]}
                        />
                    </ControlsContainer>
                    <ControlsContainer
                        height={"calc(100% - 32px)"}
                        margin={"0"}
                    >
                        <Range
                            label="Angle"
                            ref={dottAngleRef}
                            value={initialSettings.dotten.angle}
                            max={100}
                        />
                        <Range
                            label="Size"
                            ref={dottSizeRef}
                            value={initialSettings.dotten.size}
                            max={100}
                        />
                    </ControlsContainer>
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Tint"
                show={currentTool === toolsArray[13] ? true : false}
            >
                <ControlsContainer>
                    <ControlsContainer height={"60px"} margin={"8px"}>
                        <Colorpicker
                            color={initialSettings.tint.color}
                            ref={tintRef}
                        />
                    </ControlsContainer>
                    <ControlsContainer
                        height={"calc(100% - 60px)"}
                        margin={"0"}
                    >
                        <Range
                            label="Strength"
                            ref={tintAlphaRef}
                            value={initialSettings.tint.alpha}
                            max={100}
                        />
                    </ControlsContainer>
                </ControlsContainer>
            </AdjustSection>

            <Tools
                tools={toolsArray}
                onChange={e => setCurrentTool(e.target.value)}
            />

            <div className={styles.generalActions}>
                <Button
                    text={"Apply"}
                    className={styles.applyButton}
                    reference={applyRef}
                />
            </div>
        </section>
    )
}

export default App
