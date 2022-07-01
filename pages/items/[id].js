import ItemAPI from "../../lib/api/Items"

import styles from "../../styles/DetailItems.module.css"

import {router} from "next/router"

export default function detailItemPage(item){

    const handleDelete = async () => {
        console.log(item.item)
        try{
            await ItemAPI.delete(item.item)
        } catch (e){
            
        }
        router.push("/")
    }

    return item.item &&(
        <>
            <h1>{item.item.title}</h1>
            <img src="../../../LogoBsp.png" className={styles.image}></img>
            <h3>{item.item.subtitle}</h3>
            <p>{item.item.description}</p>
            <p><strong>Preis:</strong> CHF {item.item.price}</p>
            {item.item.user != 1 ? <p><strong>Anbieter:</strong> {item.item.user}</p> : <p><strong>Anbieter:</strong> you</p>}
            <button className={styles.btnBack}><a href={`/`}>Zurück</a></button>
            {item.item.user == 1 && item.item.status != "sold" && <button className={styles.btnDelete} onClick={handleDelete}><a>Löschen</a></button>}
            {item.item.user != 1 && item.item.status != "sold" && <button className={styles.btnBuy}><a href={`/`}>Kaufen</a></button>}

        </>
    )

    
}


export async function getStaticProps(context){
    const id = context.params.id
    let item;
    try{
        item = await ItemAPI.readId(id);
    } catch (e){
        item = null;
    }
    return{
        props: { item }, revalidate: 30
    }
}

export async function getStaticPaths() {
    let items;
    let paths;
    try{
        items = await ItemAPI.readAll()
        paths = items.map(item => (
            { 
                params: { id: item.id.toString() } 
            })
        )
    } catch (e){
        paths = []
    }
   
    
    return { paths, fallback: true }
}


