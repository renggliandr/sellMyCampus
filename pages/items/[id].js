import ItemAPI from "../../lib/api/Items"

import styles from "../../styles/DetailItems.module.css"

export default function detailItemPage(){
    return(
        <>
            <h1>TITEL</h1>
            <img src="../../../LogoBsp.png" className={styles.image}></img>
            <h3>Überschrift</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p><strong>Preis:</strong> CHF</p>
            <p><strong>Anbieter:</strong> </p>
            <button className={styles.btnBack}><a href={`/`}>Zurück</a></button>
            <button className={styles.btnBuy}><a href={`/`}>Kaufen</a></button>
        </>
    )

    
}

/*
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
    
   const paths = []
   return {paths, fallback: true}
}
*/

