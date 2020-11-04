// Old, slow but the only one method how you can copy thing to the Clipboard
export const copyfromClipBoard = async () => {
    return new Promise((resolve, reject) => {
        try {
            const textField = document.createElement("input")
            document.body.appendChild(textField)
            textField.select()
            document.execCommand("paste")
            resolve(textField.value)
            textField.remove()
        } catch (e) {
            reject(new Error(e))
        }
    })
}
