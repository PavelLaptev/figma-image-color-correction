import * as React from "react"
import styles from "./app.module.scss"
import fx from "../glfx/glfx"
//
import {
    imageToArrayBuffer,
    calculateAspectRatioFit,
    hsl2rgb,
    log,
} from "../utils"
import Button from "./components/Button"
import Dropdown from "./components/Dropdown"
import AdjustSection from "./components/AdjustSection"
import Tools from "./components/Tools"
import ControlsContainer from "./components/ControlsContainer"
import Range from "./components/Range"
import Colorpicker from "./components/Colorpicker"
import Switcher from "./components/Switcher"
//
const FileSaver = require("file-saver")

interface settingsTypes {
    brightness: any
    contrast: any
    hue: any
    saturation: any
    channelsRed: any
    channelsGreen: any
    channelsBlue: any
    exposure: any
    gamma: any
    blur: any
    lensblurRadius: any
    lensblurBrightness: any
    lensblurAngle: any
    sharpenRadius: any
    sharpenStrength: any
    vibrance: any
    invert: any
    mirror: any
    noiseStrength: any
    noiseTone: any
    dottetMode: any
    dottetAngle: any
    dottetSize: any
    tintColor: any
    tintAlpha: any
}

let initialPreset: settingsTypes = {
    brightness: 0,
    contrast: 0,
    hue: 0,
    saturation: 0,
    channelsRed: 0,
    channelsGreen: 0,
    channelsBlue: 0,
    exposure: 0,
    gamma: 100,
    blur: 0,
    lensblurRadius: 0,
    lensblurBrightness: 100,
    lensblurAngle: 45,
    sharpenRadius: 5,
    sharpenStrength: 0,
    vibrance: 0,
    invert: "Off",
    mirror: "Off",
    noiseStrength: 0,
    noiseTone: 50,
    dottetMode: "Off",
    dottetAngle: 10,
    dottetSize: 10,
    tintColor: 0,
    tintAlpha: 0,
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

    let refs = {} as settingsTypes
    Object.keys(initialPreset).map(item => {
        return (refs[item] = React.useRef(null))
    })

    //////////////////////////////////////////////////////////////
    /////////////////////////// STATES ///////////////////////////
    //////////////////////////////////////////////////////////////
    const [isLoadingState, setIsLoadingState] = React.useState(false)
    const [originalImageData, setOriginalImageData] = React.useState(null)
    const [imageData, setImageData] = React.useState(null)
    const [imageSizeInfo, setImageSizeInfo] = React.useState({
        width: 0,
        height: 0,
    })
    const [currentTool, setCurrentTool] = React.useState(toolsArray[0])

    const [states, setStates] = React.useState(initialPreset)

    //////////////////////////////////////////////////////////////
    ///////////////////////// USE EFFECT /////////////////////////
    //////////////////////////////////////////////////////////////
    React.useEffect(() => {
        let c = canvasRef.current
        let ctx = c.getContext("2d")

        let fxc = fx.canvas()
        fxc.width = c.width
        fxc.height = c.height

        // Resized image
        const image = new Image()
        image.src = imageData

        // Original image
        const originalImage = new Image()
        originalImage.src = originalImageData

        const addEffectsToCanvas = (canvas, image) => {
            canvas
                .draw(canvas.texture(image))
                .brightnessContrast(
                    states.brightness / 140,
                    states.contrast / 140
                )
                .hueSaturation(states.hue / 100, states.saturation / 100)
                .adjustchannels(
                    states.channelsRed / 100,
                    states.channelsGreen / 100,
                    states.channelsBlue / 100
                )
                .exposure(states.exposure / 100)
                .gamma(states.gamma / 100)
                .triangleBlur(states.blur)
                .lensBlur(
                    states.lensblurRadius,
                    states.lensblurBrightness / 10,
                    states.lensblurAngle / 100
                )
                .unsharpMask(states.sharpenRadius, states.sharpenStrength)
                .vibrance(states.vibrance / 100)
                .invertColor(states.invert)
                .mirror(states.mirror)
                .noise(states.noiseStrength / 100, states.noiseTone / 100)
                .dotScreen(
                    states.dottetMode,
                    0,
                    0.5,
                    states.dottetAngle / 100,
                    states.dottetSize
                )
                .colorHalftone(
                    states.dottetMode,
                    0,
                    0.5,
                    states.dottetAngle / 100,
                    states.dottetSize
                )
                .color(
                    states.tintAlpha / 20,
                    hsl2rgb(states.tintColor, 100, 50).r,
                    hsl2rgb(states.tintColor, 100, 50).g,
                    hsl2rgb(states.tintColor, 100, 50).b
                )
                .update()
        }

        const drawCanvas = () => {
            setImageSizeInfo({
                width: originalImage.width,
                height: originalImage.height,
            })

            ctx.clearRect(0, 0, c.width, c.height)

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

            c.width = wRatio * window.devicePixelRatio
            c.height = hRatio * window.devicePixelRatio
            c.style.width = wRatio
            c.style.height = hRatio

            addEffectsToCanvas(fxc, image)

            ctx.drawImage(fxc, 0, 0, c.width, c.height)
        }

        const resizeImage = imgData => {
            let cc = document.createElement("canvas")
            let ctxc = cc.getContext("2d")

            let newImage = new Image()
            newImage.src = imgData

            newImage.onload = () => {
                let wRatio = calculateAspectRatioFit(
                    newImage.width,
                    newImage.height,
                    408,
                    300
                ).width
                let hRatio = calculateAspectRatioFit(
                    newImage.width,
                    newImage.height,
                    408,
                    300
                ).height

                cc.width = wRatio * window.devicePixelRatio
                cc.height = hRatio * window.devicePixelRatio

                ctxc.clearRect(0, 0, c.width, c.height)
                ctxc.drawImage(newImage, 0, 0, cc.width, cc.height)
                setImageData(cc.toDataURL("image/png"))
            }
        }

        image.onload = () => {
            drawCanvas()
            setIsLoadingState(false)
        }

        // catch the message
        onmessage = event => {
            let imgData = event.data.pluginMessage.data

            if (
                event.data.pluginMessage.event === "section-changed" &&
                imgData !== null
            ) {
                setIsLoadingState(true)
            }

            if (imgData) {
                let base64Data =
                    "data:image/png;base64," +
                    btoa(
                        new Uint8Array(imgData).reduce(function(data, byte) {
                            return data + String.fromCharCode(byte)
                        }, "")
                    )

                setOriginalImageData(base64Data)
                resizeImage(base64Data)
                log("new image loaded")
            } else {
                setOriginalImageData(null)
                setImageData(null)
                ctx.clearRect(0, 0, c.width, c.height)
                log("nothing selected", "err")
            }
        }

        const resizeAndExportCanvas = function() {
            // create a new canvas
            let finalFXCanvas = fx.canvas()
            finalFXCanvas.width = image.width
            finalFXCanvas.height = image.height

            // draw our canvas to the new one
            addEffectsToCanvas(finalFXCanvas, originalImage)

            return finalFXCanvas
        }

        const applyResults = () => {
            setIsLoadingState(true)
            imageToArrayBuffer(resizeAndExportCanvas()).then(bytes => {
                setIsLoadingState(false)
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
    }, [imageData, states])

    ////////////////////////////////////////////////
    //////////// CHANGE STATE ON CHANGE ////////////
    ////////////////////////////////////////////////
    const setStateOnChange = ({
        event,
        prop,
        isNumber = false,
        value = null,
    }) => {
        setStates(p => {
            if (value === null) {
                return {
                    ...p,
                    [prop]: isNumber
                        ? Number(event.target.value)
                        : event.target.textContent,
                }
            } else {
                return {
                    ...p,
                    [prop]: event.target[value],
                }
            }
        })
    }

    ////////////////////////////////////////////////
    //////////////////// RETURN ////////////////////
    ////////////////////////////////////////////////
    return (
        <section className={styles.app}>
            <div className={styles.canvasWrap}>
                <div
                    className={styles.loader}
                    style={{ opacity: isLoadingState ? 1 : 0 }}
                ></div>
                <p
                    className={styles.statusText}
                    style={{ display: !imageData ? "block" : "none" }}
                >
                    Select frame with image
                </p>
                <p
                    className={styles.sizeCaption}
                    style={{ display: imageData ? "block" : "none" }}
                >
                    <span>Original size: </span>
                    {imageSizeInfo.width}x{imageSizeInfo.height}px
                </p>
                <canvas ref={canvasRef} className={styles.canvas} />
            </div>
            <AdjustSection
                title="Brightness and contrast"
                show={currentTool === toolsArray[0] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        label="Brightness"
                        ref={refs.brightness}
                        value={initialPreset.brightness}
                        min={-100}
                        max={100}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "brightness",
                                isNumber: true,
                            })
                        }}
                    />
                    <Range
                        label="Contrast"
                        ref={refs.contrast}
                        value={initialPreset.contrast}
                        min={-100}
                        max={100}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "contrast",
                                isNumber: true,
                            })
                        }}
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
                        value={initialPreset.hue}
                        min={-99}
                        max={99}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "hue",
                                isNumber: true,
                            })
                        }}
                    />
                    <Range
                        label="Saturation"
                        ref={refs.saturation}
                        value={initialPreset.saturation}
                        min={-99}
                        max={99}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "saturation",
                                isNumber: true,
                            })
                        }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Channels"
                show={currentTool === toolsArray[2] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={refs.channelsRed}
                        value={initialPreset.channelsRed}
                        min={-100}
                        max={100}
                        color="#FC4853"
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "channelsRed",
                                isNumber: true,
                            })
                        }}
                    />
                    <Range
                        ref={refs.channelsGreen}
                        value={initialPreset.channelsGreen}
                        min={-99}
                        max={99}
                        color="#63F39D"
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "channelsGreen",
                                isNumber: true,
                            })
                        }}
                    />
                    <Range
                        ref={refs.channelsBlue}
                        value={initialPreset.channelsBlue}
                        min={-99}
                        max={99}
                        color="#1D6AFF"
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "channelsBlue",
                                isNumber: true,
                            })
                        }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Exposure"
                show={currentTool === toolsArray[3] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={refs.exposure}
                        value={initialPreset.exposure}
                        max={100}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "exposure",
                                isNumber: true,
                            })
                        }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Gamma"
                show={currentTool === toolsArray[4] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={refs.gamma}
                        value={initialPreset.gamma}
                        max={200}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "gamma",
                                isNumber: true,
                            })
                        }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Blur"
                show={currentTool === toolsArray[5] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={refs.blur}
                        value={initialPreset.blur}
                        max={100}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "blur",
                                isNumber: true,
                            })
                        }}
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
                        ref={refs.lensblurRadius}
                        value={initialPreset.lensblurRadius}
                        max={200}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "lensblurRadius",
                                isNumber: true,
                            })
                        }}
                    />
                    <Range
                        label="Brightness"
                        ref={refs.lensblurBrightness}
                        value={initialPreset.lensblurBrightness}
                        max={100}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "lensblurBrightness",
                                isNumber: true,
                            })
                        }}
                    />
                    <Range
                        label="Angle"
                        ref={refs.lensblurAngle}
                        value={initialPreset.lensblurAngle}
                        max={300}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "lensblurAngle",
                                isNumber: true,
                            })
                        }}
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
                        ref={refs.sharpenRadius}
                        value={initialPreset.sharpenRadius}
                        max={10}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "sharpenRadius",
                                isNumber: true,
                            })
                        }}
                    />
                    <Range
                        label="Strength"
                        ref={refs.sharpenStrength}
                        value={initialPreset.sharpenStrength}
                        max={10}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "sharpenStrength",
                                isNumber: true,
                            })
                        }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Vibrance"
                show={currentTool === toolsArray[8] ? true : false}
            >
                <ControlsContainer>
                    <Range
                        ref={refs.vibrance}
                        value={initialPreset.vibrance}
                        max={100}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "vibrance",
                                isNumber: true,
                            })
                        }}
                    />
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Invert Colors"
                show={currentTool === toolsArray[9] ? true : false}
            >
                <ControlsContainer>
                    <Switcher
                        ref={refs.invert}
                        value={initialPreset.invert}
                        onClick={e => {
                            setStateOnChange({
                                event: e,
                                prop: "invert",
                            })
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
                        ref={refs.mirror}
                        value={initialPreset.mirror}
                        onClick={e => {
                            setStateOnChange({
                                event: e,
                                prop: "mirror",
                            })
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
                        ref={refs.noiseStrength}
                        value={initialPreset.noiseStrength}
                        max={100}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "noiseStrength",
                                isNumber: true,
                            })
                        }}
                    />
                    <Range
                        label="Tone"
                        ref={refs.noiseTone}
                        value={initialPreset.noiseTone}
                        max={100}
                        onMouseUp={e => {
                            setStateOnChange({
                                event: e,
                                prop: "noiseTone",
                                isNumber: true,
                            })
                        }}
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
                            ref={refs.dottetMode}
                            value={initialPreset.dottetMode}
                            onClick={e => {
                                setStateOnChange({
                                    event: e,
                                    prop: "dottetMode",
                                })
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
                            ref={refs.dottetAngle}
                            value={initialPreset.dottetAngle}
                            max={100}
                            onMouseUp={e => {
                                setStateOnChange({
                                    event: e,
                                    prop: "dottetAngle",
                                    isNumber: true,
                                })
                            }}
                        />
                        <Range
                            label="Size"
                            ref={refs.dottetSize}
                            value={initialPreset.dottetSize}
                            max={100}
                            onMouseUp={e => {
                                setStateOnChange({
                                    event: e,
                                    prop: "dottetSize",
                                    isNumber: true,
                                })
                            }}
                        />
                    </ControlsContainer>
                </ControlsContainer>
            </AdjustSection>

            <AdjustSection
                title="Tint"
                show={currentTool === toolsArray[13] ? true : false}
            >
                <ControlsContainer>
                    <ControlsContainer height={"120px"} margin={"8px"}>
                        <Colorpicker
                            ref={refs.tintColor}
                            onMouseUp={e => {
                                setStateOnChange({
                                    event: e,
                                    prop: "tintColor",
                                    isNumber: true,
                                })
                            }}
                        />
                    </ControlsContainer>
                    <ControlsContainer margin={"0"}>
                        <Range
                            label="Strength"
                            ref={refs.tintAlpha}
                            value={initialPreset.tintAlpha}
                            max={100}
                            onMouseUp={e => {
                                setStateOnChange({
                                    event: e,
                                    prop: "tintAlpha",
                                    isNumber: true,
                                })
                            }}
                        />
                    </ControlsContainer>
                </ControlsContainer>
            </AdjustSection>

            <Tools
                tools={toolsArray}
                onChange={e => {
                    setCurrentTool(e.target.value)
                }}
            />

            <div className={styles.generalActions}>
                <Button
                    text={"Apply"}
                    className={styles.applyButton}
                    reference={applyRef}
                />
                <Dropdown icon={"settings"}>
                    <Button
                        text={"Save preset"}
                        onClick={() => {
                            let blob = new Blob(
                                [JSON.stringify(states, null, "\t")],
                                {
                                    type: "text/plain;charset=utf-8",
                                }
                            )
                            FileSaver.saveAs(
                                blob,
                                "image-correction-preset.json"
                            )
                        }}
                    />
                    <Button
                        text={"Load preset"}
                        type={"input"}
                        onFileChange={e => {
                            const fileReader = new FileReader()
                            fileReader.readAsText(e.target.files[0], "UTF-8")
                            fileReader.onload = e => {
                                let newPreset = JSON.parse(
                                    e.target.result as string
                                )
                                setStates(newPreset)
                                Object.values(refs).map((item, i) => {
                                    item.current.reset(
                                        Object.values(newPreset)[i]
                                    )
                                })
                            }
                        }}
                    />
                    <Button
                        text={"Reset all"}
                        onFocus={() => {
                            setStates(initialPreset)
                            Object.values(refs).map((item, i) => {
                                item.current.reset(
                                    Object.values(initialPreset)[i]
                                )
                            })
                        }}
                    />
                </Dropdown>
            </div>
        </section>
    )
}

export default App
