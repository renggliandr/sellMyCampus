import Layout from '../components/Layout'
import '../styles/globals.css'
import GlobalContextProvider from "/store"


export default function MyApp({ Component, pageProps }) {
    return (
        <GlobalContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </GlobalContextProvider>
    )
}