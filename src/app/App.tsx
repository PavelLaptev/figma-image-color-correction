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
    // mirror: any
    noiseStrength: any
    noiseTone: any
    // dottetMode: any
    dottetAngle: any
    dottetSize: any
    // tintColor: any
    tintAlpha: any
}

const initialSettings: settingsTypes = {
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
    invert: "off",
    // mirror: "off",
    noiseStrength: 0,
    noiseTone: 50,
    // dottetMode: "off",
    dottetAngle: 1,
    dottetSize: 10,
    // tintColor: "#fc4848",
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
    Object.keys(initialSettings).map(item => {
        return (refs[item] = React.useRef(null))
    })

    // console.log(refs)

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
                    Number(states.lensblurRadius),
                    Number(states.lensblurBrightness / 10),
                    Number(states.lensblurAngle / 100)
                )
                .unsharpMask(
                    Number(states.sharpenRadius),
                    Number(states.sharpenStrength)
                )
                .vibrance(states.vibrance / 100)
                .invertColor(states.invert)
                // .mirror(mirrorState)
                .noise(
                    Number(states.noiseStrength) / 100,
                    Number(states.noiseTone) / 100
                )
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
    }, [imageData, states])

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
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    brightness: e.target.value,
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
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    contrast: e.target.value,
                                }
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
                        value={initialSettings.hue}
                        min={-99}
                        max={99}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    hue: e.target.value,
                                }
                            })
                        }}
                    />
                    <Range
                        label="Saturation"
                        ref={refs.saturation}
                        value={initialSettings.saturation}
                        min={-99}
                        max={99}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    saturation: e.target.value,
                                }
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
                        value={initialSettings.channelsRed}
                        min={-100}
                        max={100}
                        color="#FC4853"
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    channelsRed: e.target.value,
                                }
                            })
                        }}
                    />
                    <Range
                        ref={refs.channelsGreen}
                        value={initialSettings.channelsGreen}
                        min={-99}
                        max={99}
                        color="#63F39D"
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    channelsGreen: e.target.value,
                                }
                            })
                        }}
                    />
                    <Range
                        ref={refs.channelsBlue}
                        value={initialSettings.channelsBlue}
                        min={-99}
                        max={99}
                        color="#1D6AFF"
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    channelsBlue: e.target.value,
                                }
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
                        value={initialSettings.exposure}
                        max={100}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    exposure: e.target.value,
                                }
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
                        value={initialSettings.gamma}
                        max={200}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    gamma: e.target.value,
                                }
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
                        value={initialSettings.blur}
                        max={100}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    blur: e.target.value,
                                }
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
                        value={initialSettings.lensblurRadius}
                        max={200}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    lensblurRadius: e.target.value,
                                }
                            })
                        }}
                    />
                    <Range
                        label="Brightness"
                        ref={refs.lensblurBrightness}
                        value={initialSettings.lensblurBrightness}
                        max={100}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    lensblurBrightness: e.target.value,
                                }
                            })
                        }}
                    />
                    <Range
                        label="Angle"
                        ref={refs.lensblurAngle}
                        value={initialSettings.lensblurAngle}
                        max={300}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    lensblurAngle: e.target.value,
                                }
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
                        value={initialSettings.sharpenRadius}
                        max={10}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    sharpenRadius: e.target.value,
                                }
                            })
                        }}
                    />
                    <Range
                        label="Strength"
                        ref={refs.sharpenStrength}
                        value={initialSettings.sharpenStrength}
                        max={10}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    sharpenStrength: e.target.value,
                                }
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
                        value={initialSettings.vibrance}
                        max={100}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    vibrance: e.target.value,
                                }
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
                        onClick={e => {
                            console.log(e.target.getAttribute("data-label"))
                            setStates(p => {
                                return {
                                    ...p,
                                    invert: e.target.getAttribute("data-label"),
                                }
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
                        ref={refs.noiseStrength}
                        value={initialSettings.noiseStrength}
                        max={100}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    noiseStrength: e.target.value,
                                }
                            })
                        }}
                    />
                    <Range
                        label="Tone"
                        ref={refs.noiseTone}
                        value={initialSettings.noiseTone}
                        max={100}
                        onMouseUp={e => {
                            setStates(p => {
                                return {
                                    ...p,
                                    noiseTone: e.target.value,
                                }
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
                            ref={refs.dottetAngle}
                            value={initialSettings.dottetAngle}
                            max={100}
                            onMouseUp={e => {
                                setStates(p => {
                                    return {
                                        ...p,
                                        dottetAngle: e.target.value,
                                    }
                                })
                            }}
                        />
                        <Range
                            label="Size"
                            ref={refs.dottetSize}
                            value={initialSettings.dottetSize}
                            max={100}
                            onMouseUp={e => {
                                setStates(p => {
                                    return {
                                        ...p,
                                        dottetSize: e.target.value,
                                    }
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
                    <ControlsContainer height={"60px"} margin={"8px"}>
                        {/* <Colorpicker
                            color={initialSettings.tintColor}
                            ref={refs.tintColor}
                        /> */}
                    </ControlsContainer>
                    <ControlsContainer
                        height={"calc(100% - 60px)"}
                        margin={"0"}
                    >
                        <Range
                            label="Strength"
                            ref={refs.tintAlpha}
                            value={initialSettings.tintAlpha}
                            max={100}
                            onMouseUp={e => {
                                setStates(p => {
                                    return {
                                        ...p,
                                        tintAlpha: e.target.value,
                                    }
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
                    <Button text={"Save preset"} />
                    <Button text={"Load preset"} />
                    <Button
                        text={"Reset all"}
                        onClick={() => {
                            setStates(initialSettings)
                            Object.values(refs).map((item, i) => {
                                // console.log(Object.values(initialSettings)[i])
                                item.current.reset(
                                    Object.values(initialSettings)[i]
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
