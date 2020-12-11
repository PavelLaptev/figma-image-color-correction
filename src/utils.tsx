// Convert Image to the ArrayBuffer type
export const imageToArrayBuffer = (
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

//
export const drawNewImage = (c, ctx, img) => {
    let hRatio = 300 / img.width
    let vRatio = 150 / img.height
    let ratio = Math.min(hRatio, vRatio)

    ctx.clearRect(0, 0, c.width, c.height)
    ctx.drawImage(
        img,
        c.width / 2 - (img.width * ratio) / 2,
        0,
        img.width * ratio,
        img.height * ratio
    )
}

//
export const calculateAspectRatioFit = (
    srcWidth,
    srcHeight,
    maxWidth,
    maxHeight
) => {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)

    return { width: srcWidth * ratio, height: srcHeight * ratio }
}

//
const lerp = (x, y, a) => x * (1 - a) + y * a
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a))
const invlerp = (x, y, a) => clamp((a - x) / (y - x))
export const rangeInterpolation = (x1, y1, x2, y2, a) =>
    Math.round(lerp(x2, y2, invlerp(x1, y1, a)))

//
export const hex2Rgb = hex => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null
}

//
export const hsl2rgb = (h, s, l) => {
    let a = s * Math.min(l, 1 - l)
    let f = (n, k = (n + h / 30) % 12) =>
        l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return { r: f(0), g: f(8), b: f(4) }
}

//
export const log = (text = "Hi!" as any, mode = "default") => {
    let restStyles = "border-radius: 4px; padding: 2px 0;"
    if (mode === "default") {
        console.log(
            `%c ${text}`,
            `background: rgba(44, 171, 255, 0.14);${restStyles}`
        )
    }
    if (mode === "err") {
        console.log(
            `%c ${text}`,
            `background: rgba(255,0,0,0.14);${restStyles}`
        )
    }
    if (mode === "succ") {
        console.log(
            `%c ${text}`,
            `background: rgba(0, 255, 55, 0.14);${restStyles}`
        )
    }
    if (mode === "dev") {
        console.log(text)
    }
}
