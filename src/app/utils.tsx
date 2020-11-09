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
