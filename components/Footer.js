import styles from "./Footer.module.css"

export default function Footer(){
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.content}>
                    <p className="text">Sell my Campus - <a href="../impressum" className={styles.impressum}>Impressum</a></p>
                    
                    
                </div>
                
            </footer>
        </>
    )

}