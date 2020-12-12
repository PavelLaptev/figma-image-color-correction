// import { log } from "../utils"

// Show UI
figma.showUI(__html__, { width: 456, height: 690 })

export function openLink(url) {
    figma.showUI(
        '<script>window.open("' +
            url +
            '", "_blank"); parent.postMessage({ pluginMessage: { type: "close" } }, "*");</script>',
        { visible: false }
    )
    setTimeout(() => {
        figma.closePlugin("(♡-_-♡) 𝙏𝙝𝙖𝙣𝙠 𝙮𝙤𝙪 𝙎𝙚𝙣𝙥𝙖𝙞 ")
    }, 500)
}

const sendFullImage = () => {
    try {
        let node = figma.currentPage.selection[0]
        figma
            .getImageByHash(node["fills"][node["fills"].length - 1].imageHash)
            .getBytesAsync()
            .then(res =>
                figma.ui.postMessage({
                    type: "image",
                    data: res,
                    event: "section-changed",
                })
            )
        // log("image recieved from Figma")
    } catch {
        figma.ui.postMessage({
            type: "image",
            data: null,
            event: "section-changed",
        })
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
            ...currentFills[0],
            imageHash: imageHash,
        }

        node["fills"] = [...currentFills, ...[newFill]]
    }

    if (msg.type !== "img" && !node) {
        figma.notify("📌 Select frame with image", {
            timeout: 2000,
        })
    }

    if (msg.type === "donate-link") {
        openLink("https://www.paypal.com/paypalme/pavellaptev")
    }
}

figma.currentPage.setRelaunchData({ open: "" })

// TO-DO
// Add original images size caption
