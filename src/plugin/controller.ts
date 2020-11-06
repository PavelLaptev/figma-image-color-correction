// Show UI
figma.showUI(__html__, { width: 240, height: 254 })

try {
    let node = figma.currentPage.selection[0]
    node.exportAsync({ format: "PNG" })
        .then(res => figma.ui.postMessage({ type: "image", data: res }))
        .catch(err => console.error(err))
} catch {
    figma.ui.postMessage({ type: "image", data: null })
}

figma.on("selectionchange", () => {
    let node = figma.currentPage.selection[0]

    node.exportAsync({ format: "PNG" })
        .then(res => figma.ui.postMessage({ type: "image", data: res }))
        .catch(err => console.error(err))
    // figma.ui.postMessage({type: 'selection', selected: figma.currentPage.selection[0]});
})

// figma.ui.onmessage = msg => {
//   const target = figma.currentPage.selection[0];

//   console.log(target);
//   // figma.ui.postMessage({type: 'selection', selected: figma.currentPage.selection[0]});
// };

figma.currentPage.setRelaunchData({ open: "" })
