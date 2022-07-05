import styles from "./BoxHome.module.css"

export default function BoxHome(props){

    return(
        <div className={styles.box}>
            <h2>{props.title}</h2>
            {props.image != "" ? <img src={`https://sellmycampus.blob.core.windows.net/picssellmycampus/${props.image}`} className={styles.image}></img> : <img src={"../../../LogoBsp.png"} className={styles.image}></img>}
            <p><strong>Preis:</strong> CHF {props.price}</p>
            <button className={styles.btnDetail}><a href={`/items/${props.id}`}>Details</a></button>
        </div>
    )
}