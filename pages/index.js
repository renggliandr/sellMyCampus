import BoxHome from "../components/BoxHome"
import styles from "../styles/Home.module.css"

export default function indexPage(){

    return(
        <div>
            <h1>Aktuelle Angebote</h1>
            <div className={styles.boxen}>
                <BoxHome title = "Maus" price = "20.5" id="1"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>

                <BoxHome title = "Tastatur" price = "34.5" id="3"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="4"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="5"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="6"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="7"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="8"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="9"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="10"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>
                <BoxHome title = "Tastatur" price = "34.5" id="2"></BoxHome>

            </div>
        </div>
    )
}