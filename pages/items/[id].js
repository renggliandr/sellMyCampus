import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ItemAPI from "../../lib/api/Items"
import styles from "./DetailItems.module.css"
import { router } from "next/router"
import { useGlobalContext } from "../../store"


export default function detailItemPage(item, users) {


    const { session } = useGlobalContext()

    const handleDelete = async () => {
        console.log(item.item)
        try {
            await ItemAPI.delete(item.item)
        } catch (e) {

        }
        router.push("/")
    }

    const handleBuy = async () => {
        item.item.status = "sold"
        item.item.boughtBy[0].userid = session.id.toString()
        item.item.boughtBy[0].name = session.username.toString()
        await ItemAPI.create(item.item)
    }

    const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

    return item.item && (
        <>
            <h1>{item.item.title}</h1>
            <div className={styles.carousel}>
                <Carousel renderItem={customRenderItem} useKeyboardArrows showStatus={false} autoPlay={true}
                    showThumbs={false} infiniteLoop={true} dynamicHeight={true} showArrows={true} showIndicators={true} interval={"3000"}>
                    {
                        item.item.images.map(img => {
                            return (
                                <img src={`https://sellmycampus.blob.core.windows.net/picssellmycampus/${img.path}`} key={img.path} alt={"Bilder"} />
                            )
                        })
                    }
                </Carousel>
            </div>
            {item.item.images[0].path != "" ? <></>
                : <img src={"../../../LogoBsp.png"} className={styles.image}></img>}
            <h3 className={styles.untertitel}>{item.item.subtitle}</h3>
            <p>{item.item.description}</p>
            <p><strong>Preis:</strong> CHF {item.item.price}</p>
            {session && item.item.user[0].userid == session.id ? <p><strong>Anbieter:</strong> you</p> : <p><strong>Anbieter:</strong> {item.item.user[0].name}</p>}
            <p><strong>Veröffentlicht:</strong> {item.item.published}</p>
            {item.item.status == "sold" && <p><span className={styles.sold}>SOLD</span> Käufer: {item.item.boughtBy[0].name}</p>}
            <button className={styles.btnBack}><a href={`/`}>Zurück</a></button>
            {session && (item.item.user[0].userid == session.id) && (item.item.status != "sold") && <button className={styles.btnDelete} onClick={handleDelete}><a>Löschen</a></button>}
            {session && (item.item.user[0].userid != session.id) && (item.item.status != "sold") && <button className={styles.btnBuy} onClick={handleBuy}><a href={`/`}>Kaufen</a></button>}

        </>
    )
}


export async function getStaticProps(context) {
    const id = context.params.id
    let item;
    try {
        item = await ItemAPI.readId(id);
    } catch (e) {
        item = null;
    }
    return {
        props: { item }, revalidate: 30
    }
}

export async function getStaticPaths() {
    let items;
    let paths;
    try {
        items = await ItemAPI.readAll()
        paths = items.map(item => (
            {
                params: { id: item.id.toString() }
            })
        )
    } catch (e) {
        paths = []
    }


    return { paths, fallback: true }
}


