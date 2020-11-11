// Show UI
figma.showUI(__html__, { width: 332, height: 700 })

const sendFullImage = node => {
    figma
        .getImageByHash(node["fills"][node["fills"].length - 1].imageHash)
        .getBytesAsync()
        .then(res => figma.ui.postMessage({ type: "image", data: res }))
}

try {
    let node = figma.currentPage.selection[0]
    sendFullImage(node)
} catch {
    figma.ui.postMessage({ type: "image", data: null })
}

figma.on("selectionchange", () => {
    let node = figma.currentPage.selection[0]

    sendFullImage(node)
})

figma.ui.onmessage = msg => {
    let node = figma.currentPage.selection[0]
    if (msg.type === "img") {
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
    }
}

// figma.ui.onmessage = msg => {
//   const target = figma.currentPage.selection[0];

//   console.log(target);
//   // figma.ui.postMessage({type: 'selection', selected: figma.currentPage.selection[0]});
// };

figma.currentPage.setRelaunchData({ open: "" })
