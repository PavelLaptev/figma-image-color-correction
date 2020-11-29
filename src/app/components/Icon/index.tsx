import * as React from "react"
import styles from "./styles.module.scss"

import brightnesContrastSVG from "./svg/brightnes-contrast.svg"
import settingsSVG from "./svg/settings.svg"
import blurSVG from "./svg/blur.svg"
import bulgeSVG from "./svg/bulge.svg"
import channelsSVG from "./svg/channels.svg"
import dottedSVG from "./svg/dotted.svg"
import exposureSVG from "./svg/exposure.svg"
import gammaSVG from "./svg/gamma.svg"
import hueSVG from "./svg/hue.svg"
import invertSVG from "./svg/invert.svg"
import kebabSVG from "./svg/kebab.svg"
import lensBlurSVG from "./svg/lens-blur.svg"
import mirrorSVG from "./svg/mirror.svg"
import noiseSVG from "./svg/noise.svg"
import sharpSVG from "./svg/sharp.svg"
import vibranceSVG from "./svg/vibrance.svg"
import tintSVG from "./svg/tint.svg"

const icons = {
    "brightnes-contrast": brightnesContrastSVG,
    settings: settingsSVG,
    blur: blurSVG,
    bulge: bulgeSVG,
    channels: channelsSVG,
    dotted: dottedSVG,
    exposure: exposureSVG,
    gamma: gammaSVG,
    hue: hueSVG,
    invert: invertSVG,
    kebab: kebabSVG,
    "lens-blur": lensBlurSVG,
    mirror: mirrorSVG,
    noise: noiseSVG,
    sharp: sharpSVG,
    vibrance: vibranceSVG,
    tint: tintSVG,
}

interface Props {
    className?: any
    name: string
}

const Icon: React.FunctionComponent<Props> = props => {
    return (
        <i
            className={`${props.className} ${styles.icon}`}
            style={{ backgroundImage: `url(${icons[props.name]})` }}
        ></i>
    )
}

Icon.defaultProps = {} as Partial<Props>

export default Icon
