import ItemAPI from "../../lib/api/Items"

import styles from "../../styles/DetailItems.module.css"

export default function detailItemPage(item){

    return item &&(
        <>
            <h1>{item.item.title}</h1>
            <img src="../../../LogoBsp.png" className={styles.image}></img>
            <h3>{item.item.subtitle}</h3>
            <p>{item.item.description}</p>
            <p><strong>Preis:</strong> CHF {item.item.price}</p>
            <p><strong>Anbieter:</strong> </p>
            <button className={styles.btnBack}><a href={`/`}>Zurück</a></button>
            <button className={styles.btnBuy}><a href={`/`}>Kaufen</a></button>
        </>
    )

    
}


export async function getStaticProps(context){
    const id = context.params.id
    const item = await ItemAPI.readId(id);
    return{
        props: { item }, revalidate: 30
    }
}

export async function getStaticPaths() {
    
    const items = await ItemAPI.readAll()
    const paths = items.map(item => (
        { 
            params: { id: item.id.toString() } 
        })
    )
    return { paths, fallback: true }
}


