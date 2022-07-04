import BoxHome from "../components/BoxHome"
import styles from "../styles/Home.module.css"

import ItemAPI from "/lib/api/Items"

import { useGlobalContext } from "../store"


export default function myItemsPage({items}){
    const { session } = useGlobalContext()


    return(
        <>
        {session ? <div>
            <h1>Meine Artikel</h1>
            <h2>Offene Angebote</h2>
             <div className={styles.boxen}>
                {
                    items && items.map(item => {
                        if(item.user[0].userid == session.id && item.status != "sold"){
                            return <BoxHome title = {item.title} price = {item.price} id = {item.id} key = {item.id} user = {item.user} image = {item.images[0].path}/>
                        }
                    })
                }
            </div>
            <br />
            <h2>Bereits verkaufte Angebote</h2>
            <div className={styles.boxen}>
                {
                    items && items.map(item => {
                        if(item.user[0].userid == session.id && item.status == "sold"){
                            return <BoxHome title = {item.title} price = {item.price} id = {item.id} key = {item.id} user = {item.user} image = {item.images[0].path}/>
                        }
                    })
                }
            </div>
            <br />
            <h2>Gekaufte Angebote</h2>
            <div className={styles.boxen}>
                {
                    items && items.map(item => {
                        if(item.boughtBy[0].userid == session.id && item.status == "sold"){
                            return <BoxHome title = {item.title} price = {item.price} id = {item.id} key = {item.id} user = {item.user} image = {item.images[0].path}/>
                        }
                    })
                }
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
