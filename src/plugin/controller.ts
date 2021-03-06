// import { log } from "../utils"

// Show UI
figma.showUI(__html__, { width: 456, height: 690 })

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
            ...currentFills[currentFills.length - 1],
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
        figma.notify("(♡-_-♡) 𝙏𝙝𝙖𝙣𝙠 𝙮𝙤𝙪 𝙎𝙚𝙣𝙥𝙖𝙞 ", {
            timeout: 5000,
        })
    }
}

figma.currentPage.setRelaunchData({ open: "" })

// TO-DO
// Add more filters
