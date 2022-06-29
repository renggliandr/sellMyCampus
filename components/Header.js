import Navigation from "./Navigation"

import styles from "./Header.module.css"

export default function Header(){
    return(
        <>
            <div className={styles.whole_header}>
            <div className={styles.header}>
                <a href="/"><img src="/LogoBsp.png" className={styles.image}></img></a>
                <a href="/"><h1 className={styles.h1}>Sell my Campus</h1></a>
            </div>
            <div>
                <Navigation></Navigation>
            </div>
            </div>
        </>
    )
}