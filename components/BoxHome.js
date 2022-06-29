import styles from "./BoxHome.module.css"

export default function BoxHome(props){
    return(
        <div className={styles.box}>
            <h2>{props.title}</h2>
            <img src="/LogoBsp.png" className={styles.image}></img>
            <p><strong>Preis:</strong> CHF {props.price}</p>
            <button href="/" className={styles.btnDetail}>Details</button>
        </div>
    )
}