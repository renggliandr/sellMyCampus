import ItemForm from "../components/ItemForm"

import CredentialsAPI from "../lib/api/Credentials"
import ItemAPI from "../lib/api/Items"

export default function postItemPage({url, sasKey, highestId, items}){

    return(
        <div>
            <ItemForm url={url} sasKey = {sasKey} highestId={highestId} items={items}/>
        </div>
    )

}

export async function getStaticProps() {
    const body = await CredentialsAPI.get();
    const url = body.url
    const sasKey = body.sasKey
    const highestId = await ItemAPI.getHighestId();
    const items = await ItemAPI.readAll();
    return {
        props: { url, sasKey, highestId, items }, revalidate: 30
    }
}