import BoxHome from "../components/BoxHome"
import styles from "../styles/Home.module.css"

export default function indexPage(){

    return(
        <div>
            <h1>Aktuelle Angebote</h1>
            <div className={styles.boxen}>
                <BoxHome title = "Maus" price = "20.5" id="1"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
            </div>
        </div>
    )
}