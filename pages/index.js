import BoxHome from "../components/BoxHome"
import styles from "../styles/Home.module.css"

import ItemAPI from "/lib/api/Items"

export default function indexPage({items}){

    return (
        <div>
            <h1>Aktuelle Angebote</h1>
             <div className={styles.boxen}>
                {
                    items && items.map(item => {
                        return <BoxHome title = {item.title} price = {item.price} id = {item.id} key = {item.id}/>
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


/*
    module.exports = async function (context, req) {
        myItems = context.bindings.inputDocument;
        context.res = {
            // status: 200, /* Defaults to 200 */
            /*
            body: myItems
        };
    }

*/