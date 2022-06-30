import BoxHome from "../components/BoxHome"
import styles from "../styles/Home.module.css"

import ItemAPI from "/lib/api/Items"

export default function myItemsPage({items}){

    return (
        <div>
            <h1>Meine Artikel</h1>
             <div className={styles.boxen}>
                {
                    items && items.map(item => {
                        if(item.user == "1"){
                            return <BoxHome title = {item.title} price = {item.price} id = {item.id} key = {item.id} user = {item.user}/>
                        }
                    })
                }
            

            </div>
        </div>
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
