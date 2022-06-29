import Header from "./Header";
import Footer from "./Footer";


export default function Layout({children}) {

    return (
        <>
            <Header></Header>
                <main>     
                        <div>
                            {children}
                        </div>
                </main>
            <Footer></Footer>
        </>
    )
}