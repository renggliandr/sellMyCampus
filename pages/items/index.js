import BoxHome from "../../components/BoxHome"
import styles from "../../styles/Home.module.css"

import ItemAPI from "../../lib/api/Items"

import { useGlobalContext } from "../../store"


export default function itemsPage({items}){
    const { session } = useGlobalContext()


    return(
        <>
        <h1>Alle Artikel</h1>
        {session ? <div>    
        <div className={styles.boxen}> 
            {items.map(item => {  
                return <BoxHome title = {item.title} price = {item.price} id = {item.id} key = {item.id} user = {item.user} image = {item.images[0].path}/> 
            })}
        </div>
                 
        </div> : <p>Für diesen Bereich müssen Sie eingeloggt sein. <a href="/login">Hier</a> geht es zum Login.</p>}
        </>
        
    )
}

export async function getStaticProps(){
    let items;
    try{
        items = await ItemAPI.readAll();

    } catch (e){
        items = null;
    }
    return{
        props: { items }, revalidate: 30
    }
}
