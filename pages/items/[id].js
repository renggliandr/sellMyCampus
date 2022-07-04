import ItemAPI from "../../lib/api/Items"

import styles from "../../styles/DetailItems.module.css"

import {router} from "next/router"

import { useGlobalContext } from "../../store"
import CredentialsAPI from "../../lib/api/Credentials"


export default function detailItemPage(item, sasKey, url){
    const { session } = useGlobalContext()

    const handleDelete = async () => {
        console.log(item.item)
        try{
            await ItemAPI.delete(item.item)
        } catch (e){
            
        }
        router.push("/")
    }

    const handleBuy = async () => {
        item.item.status = "sold"
        item.item.boughtBy = session.id.toString()
        await ItemAPI.create(item.item)
    }


    return item.item &&(
        <>
            <h1>{item.item.title}</h1>
            {item.item.images[0].path != "" ? <img src={`https://sellmycampus.blob.core.windows.net/picssellmycampus/${item.item.images[0].path}`} className={styles.image}></img> : <img src={"../../../LogoBsp.png"} className={styles.image}></img>}
            <h3>{item.item.subtitle}</h3>
            <p>{item.item.description}</p>
            <p><strong>Preis:</strong> CHF {item.item.price}</p>
            {session && item.item.user == session.id ? <p><strong>Anbieter:</strong> you</p> : <p><strong>Anbieter:</strong> {item.item.user}</p>}
            <p><strong>Veröffentlicht:</strong> {item.item.published}</p>
            {item.item.status == "sold" && <p><span className={styles.sold}>SOLD</span> Käufer: {item.item.boughtBy}</p>}
            <button className={styles.btnBack}><a href={`/`}>Zurück</a></button>
            {session && (item.item.user == session.id) && (item.item.status != "sold") && <button className={styles.btnDelete} onClick={handleDelete}><a>Löschen</a></button>}
            {session && (item.item.user != session.id) && (item.item.status != "sold") && <button className={styles.btnBuy} onClick = {handleBuy}><a href={`/`}>Kaufen</a></button>}

        </>
    )  
}


export async function getStaticProps(context){
    const id = context.params.id
    let item;
    const body = await CredentialsAPI.get();
    const url = body.url
    const sasKey = body.sasKey
    try{
        item = await ItemAPI.readId(id);
    } catch (e){
        item = null;
    }
    return{
        props: { item, sasKey, url }, revalidate: 30
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


