// Show UI
figma.showUI(__html__, { width: 456, height: 690 })

const sendFullImage = () => {
    try {
        let node = figma.currentPage.selection[0]
        figma
            .getImageByHash(node["fills"][node["fills"].length - 1].imageHash)
            .getBytesAsync()
            .then(res => figma.ui.postMessage({ type: "image", data: res }))
    } catch {
        figma.ui.postMessage({ type: "image", data: null })
        figma.notify("📌 Select frame with image", {
            timeout: 2000,
        })
    }
}

sendFullImage()

figma.on("selectionchange", () => {
    sendFullImage()
})

figma.ui.onmessage = msg => {
    let node = figma.currentPage.selection[0]
    if (msg.type === "img" && node) {
        const currentFills = node["fills"]
        const imageHash = figma.createImage(msg.bytes).hash

        const newFill = {
            type: "IMAGE",
            opacity: 1,
            blendMode: "NORMAL",
            scaleMode: "FILL",
            imageHash: imageHash,
        }

        node["fills"] = [...currentFills, ...[newFill]]
    } else {
        figma.notify("📌 Select something…", {
            timeout: 2000,
        })
    }
}

figma.currentPage.setRelaunchData({ open: "" })
