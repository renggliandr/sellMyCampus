import ItemForm from "../components/ItemForm"

import CredentialsAPI from "../lib/api/Credentials"
import ItemAPI from "../lib/api/Items"

export default function postItemPage({url, sasKey, highestId}){
    console.log(highestId)

    return(
        <div>
            <ItemForm url={url} sasKey = {sasKey} highestId={highestId}/>
        </div>
    )

}

export async function getStaticProps() {
    //const body = await CredentialsAPI.get();
    //const url = body.url
    //const sasKey = body.sasKey
    const url = null
    const sasKey = null
    const highestId = await ItemAPI.getHighestId();
    return {
        props: { url, sasKey, highestId }, revalidate: 30
    }
}