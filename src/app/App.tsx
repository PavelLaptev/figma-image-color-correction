import * as React from "react"
import styles from "./app.module.scss"
//
import Range from "./components/Range"

// Application
const App = ({}) => {
    const hondleAppFocus = () => {
        // parent.postMessage({pluginMessage: {type: 'focus'}}, '*');
        console.log("focus")
    }

    const handleOnChange = () => {
        console.log("sd")
    }

    return (
        <section className={styles.app} onClick={hondleAppFocus}>
            <Range label="Yo" onChange={handleOnChange} />
        </section>
    )
}

export default App
