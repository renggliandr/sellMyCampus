import styles from "./BoxHome.module.css"

export default function BoxHome(props){

    return(
        <div className={styles.box}>
            <div className={styles.darkBackgroundUp}>
                <h2 className={styles.title}>{props.title}</h2>
            </div>
            <div className={styles.imageSpace}>
                {props.image != "" ? <img src={`https://sellmycampus.blob.core.windows.net/picssellmycampus/${props.image}`} className={styles.image}></img> : <img src={"../../../LogoBsp.png"} className={styles.image}></img>}
            </div>
            <p><strong>Preis:</strong> CHF {props.price}</p>
            <div className={styles.darkLine}></div>
            <button className={styles.btnDetail}><a href={`/items/${props.id}`}>Details</a></button>
        </div>
    )
}