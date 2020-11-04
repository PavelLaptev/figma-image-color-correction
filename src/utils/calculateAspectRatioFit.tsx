// calculate new image size based on the aspect ratio
export const calculateAspectRatioFit = (srcWidth, srcHeight, maxSize) => {
    var ratio = Math.min(maxSize / srcWidth, maxSize / srcHeight)
    return { width: srcWidth * ratio, height: srcHeight * ratio }
}
