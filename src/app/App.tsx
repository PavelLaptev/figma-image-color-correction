import * as React from "react"
import styles from "./app.module.scss"
import fx from "../glfx/glfx"
//
import { imageToArrayBuffer, calculateAspectRatioFit, hexToRgb } from "./utils"
import Button from "./components/Button"
import Dropdown from "./components/Dropdown"
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
        mode: "off",
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
    //////////////////////////////////////////////////////////////
    //////////////////////////// REFS ////////////////////////////
    //////////////////////////////////////////////////////////////
    const canvasRef = React.useRef(null)
    const applyRef = React.useRef(null)

    let refs = {}
    Object.keys(initialSettings).map(item => {
        return (refs[item] = React.useRef(null))
    })

    //////////////////////////////////////////////////////////////
    /////////////////////////// STATES ///////////////////////////
    //////////////////////////////////////////////////////////////
    const [imageData, setImageData] = React.useState(null)
    const [currentTool, setCurrentTool] = React.useState(toolsArray[0])

    const [states, setStates] = React.useState(initialSettings)

    //////////////////////////////////////////////////////////////
    ///////////////////////// USE EFFECT /////////////////////////
    //////////////////////////////////////////////////////////////
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
                    Number(states.brightness / 140),
                    Number(states.contrast / 140)
                )
                // .hueSaturation(
                //     Number(refs.hue.current.value / 100),
                //     Number(refs.saturation.current.value / 100)
                // )
                // .adjustchannels(
                //     refs.redChannelRef.current.value / 100,
                //     refs.greenChannelRef.current.value / 100,
                //     refs.blueChannelRef.current.value / 100
                // )
                // .exposure(refs.exposureRef.current.value / 100)
                // .gamma(refs.gammaRef.current.value / 100)
                // .triangleBlur(Number(blurRef.current.value))
                // .lensBlur(
                //     Number(radiusLensBlurRef.current.value),
                //     Number(brLensBlurRef.current.value / 10),
                //     Number(angleLensBlurRef.current.value / 100)
                // )
                // .unsharpMask(
                //     Number(sharpenRadiusRef.current.value),
                //     Number(sharpenStrengthRef.current.value)
                // )
                // .vibrance(vibranceRef.current.value / 100)
                // .invertColor(invertState)
                // .mirror(mirrorState)
                // .noise(
                //     Number(noiseRef.current.value) / 100,
                //     Number(noiseToneRef.current.value) / 100
                // )
                // .dotScreen(
                //     dottedState,
                //     0,
                //     0.5,
                //     Number(dottAngleRef.current.value),
                //     Number(dottSizeRef.current.value)
                // )
                // .colorHalftone(
                //     dottedState,
                //     0,
                //     0.5,
                //     Number(dottAngleRef.current.value),
                //     Number(dottSizeRef.current.value)
                // )
                // .color(
                //     Number(tintAlphaRef.current.value),
                //     hexToRgb(tintRef.current.value).r,
                //     hexToRgb(tintRef.current.value).g,
                //     hexToRgb(tintRef.current.value).b
                // )
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
        }

        // catch the message
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
        }
    }, [
        imageData,
        states.invert,
        states.mirror,
        states.dotten.mode,
        states.brightness,
        states.contrast,
    ])

    // RETURN
    return (
        <section className={styles.app}>
            <div className={styles.canvasWrap}>
                <canvas ref={canvasRef} className={styles.canvas} />
                <p
                    className={styles.statusText}
                    style={{ display: !imageData ? "block" : "none" }}
                >
                    Select frame with image
                </p>
            </div>
            {/* br.ref.current.getValue() */}
            <AdjustSection
                title="Brightness and contrast"
                show={currentTool === toolsArray[0] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="Brightness"
                        ref={refs.brightness}
                        value={initialSettings.brightness}
                        min={-100}
                        max={100}
                        onMouseUp={() => {
                            setStates(p => {
                                return {
                                    ...p,
                                    brightness: refs.brightness.current.getValue(),
                                }
                            })
                        }}
                    />
                    <Range
                        label="Contrast"
                        ref={refs.contrast}
                        value={initialSettings.contrast}
                        min={-100}
                        max={100}
                        // onMouseUp={() => {
                        //     setContrastState(
                        //         refs.contrast.current.getValue()
                        //     )
                        // }}
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
                        ref={refs.hue}
                        value={initialSettings.hue}
                        min={-99}
                        max={99}
                    />
                    <Range
                        label="Saturation"
                        ref={refs.saturation}
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
                        ref={refs.redChannelRef}
                        value={initialSettings.channels.r}
                        min={-100}
                        max={100}
                        color="#FC4853"
                    />
                    <Range
                        ref={refs.greenChannelRef}
                        value={initialSettings.channels.g}
                        min={-99}
                        max={99}
                        color="#63F39D"
                    />
                    <Range
                        ref={refs.blueChannelRef}
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
                        ref={refs.exposureRef}
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
                        ref={refs.gammaRef}
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
                        ref={refs.blurRef}
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
                        ref={refs.radiusLensBlurRef}
                        value={initialSettings.lensblur.radius}
                        max={200}
                    />
                    <Range
                        label="Brightness"
                        ref={refs.brLensBlurRef}
                        value={initialSettings.lensblur.brightness}
                        max={100}
                    />
                    <Range
                        label="Angle"
                        ref={refs.angleLensBlurRef}
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
                        ref={refs.sharpenRadiusRef}
                        value={initialSettings.sharpen.radius}
                        max={10}
                    />
                    <Range
                        label="Strength"
                        ref={refs.sharpenStrengthRef}
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
                        ref={refs.vibranceRef}
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
                    // onChange={e => {
                    //     setInvertState(e.target.getAttribute("data-label"))
                    // }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Mirror"
                show={currentTool === toolsArray[10] ? true : false}
            >
                <ControlsContainer>
                    <Switcher
                    // onChange={e => {
                    //     setMirrorState(e.target.getAttribute("data-label"))
                    // }}
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
                        ref={refs.noiseRef}
                        value={initialSettings.noise.strength}
                        max={100}
                    />
                    <Range
                        label="Tone"
                        ref={refs.noiseToneRef}
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
                            // onChange={e => {
                            //     setDottedState(
                            //         e.target.getAttribute("data-label")
                            //     )
                            // }}
                            labels={["Off", "Dotted", "Halftone"]}
                        />
                    </ControlsContainer>
                    <ControlsContainer
                        height={"calc(100% - 32px)"}
                        margin={"0"}
                    >
                        <Range
                            label="Angle"
                            ref={refs.dottAngleRef}
                            value={initialSettings.dotten.angle}
                            max={100}
                        />
                        <Range
                            label="Size"
                            ref={refs.dottSizeRef}
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
                            ref={refs.tintRef}
                        />
                    </ControlsContainer>
                    <ControlsContainer
                        height={"calc(100% - 60px)"}
                        margin={"0"}
                    >
                        <Range
                            label="Strength"
                            ref={refs.tintAlphaRef}
                            value={initialSettings.tint.alpha}
                            max={100}
                        />
                    </ControlsContainer>
                </ControlsContainer>
            </AdjustSection>

            <Tools
                tools={toolsArray}
                onChange={e => {
                    console.log(e.target), setCurrentTool(e.target.value)
                }}
            />

            <div className={styles.generalActions}>
                <Button
                    text={"Apply"}
                    className={styles.applyButton}
                    reference={applyRef}
                />
                <Dropdown icon={"settings"}>
                    <Button text={"Save preset"} />
                    <Button text={"Load preset"} />
                    <Button
                        text={"Reset all"}
                        onClick={() => {
                            setStates(initialSettings)
                            refs.brightness.current.reset(0)
                        }}
                    />
                </Dropdown>
            </div>
        </section>
    )
}

export default App
