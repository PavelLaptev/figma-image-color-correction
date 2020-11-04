// Show UI
figma.showUI(__html__, { width: 240, height: 254 })

figma.on("selectionchange", () => {
    console.log("changed")
})

// figma.ui.onmessage = msg => {
//   const target = figma.currentPage.selection[0];

//   console.log(target);
//   // figma.ui.postMessage({type: 'selection', selected: figma.currentPage.selection[0]});
// };

figma.currentPage.setRelaunchData({ open: "" })
