import Header from "./Header";
import Footer from "./Footer";
import Styles from "./Layout.module.css"


export default function Layout({children}) {

    return (
        <>
        <div className={Styles.allButFooter}>
            <Header></Header>
                <main>     
                        <div>
                            {children}
                        </div>
                </main>
                </div>
            <Footer></Footer>
        </>
    )
}