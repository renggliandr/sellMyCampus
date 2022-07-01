import { useEffect, useState } from "react";
import Button from "./Button";
import { router } from "next/router";
import styles from "./ItemForm.module.css"
import CredentialsAPI from "../lib/api/Credentials";

const defaultItem = {
    title: "",
    price: 0,
    images: [{
        path: ""
    }]
}

export default function ItemForm({url, sasKey }) {

    const [titleError, setTitleError] = useState(true);
    const [imgError, setImgError] = useState(true)
    const [item, setItem] = useState(defaultItem)
    const [price, setPrice] = useState(0)
    const [files, setFiles] = useState([])
    const [success, setSuccess] = useState(false)
    const { BlockBlobClient, AnonymousCredential } = require("@azure/storage-blob");

    useEffect(() => {
        setItem({
            ...item,
            ...{ price: price }
        })
    }, [price])

    const handleChange = (e) => {
        setItem(
            {
                ...item,
                ...{ title: e.target.value }
            }
        )
        validateTitle(e.target.value)
    }

    const changePrice = (e) => {
        setPrice(e.target.value)
    }

    const validateTitle = (value) => {
        if (value === "") {
            setTitleError("Titel darf nicht leer sein!")
        } else {
            setTitleError(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titleError && !imgError) {
            const resp = updateFileNames()
            blopUpload(resp[0])
            setSuccess(true)
        } else {
            setImgError("Es muss mindestens 1 Bild hinterlegt werden!")
        }
    }

    const handleCancel = () => {
        if (confirm("Wollen sie wirklich abbrechen?")) {
            router.push("/")
        }
    }

    const onImageChange = (e) => {
        setFiles(e.target.files)

        if (!filesAreImages()) {
            setImgError("Hochgeladene Dateien müssen Bilder sein!")
        } else {
            setImgError(null)
        }
    }

    const filesAreImages = () => {
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.includes("image")) {
                return false
            }
        }
        return true
    }

    const updateFileNames = () => {
        const newFiles = []
        const jsonArr = []

        if (files.length !== 0) {
            for (let i = 0; i < files.length; i++) {
                const name = `${item.title}_${item.price}_${i}`
                jsonArr.push({
                    path: name
                })
                const newFile = new File([files[i]], name)
                newFiles.push(newFile)
            }
        }

        //update Json
        setItem(
            {
                ...item,
                ...{ images: jsonArr }
            }
        )

        const tempItem = item;
        tempItem.images = jsonArr;
        return [newFiles, tempItem]
    }

    const blopUpload = (images) => {
        console.log(sasKey)
        const container = "picssellmycampus"
        for (let i = 0; i < images.length; i++) {
            const image = images[i]
            const login = `${url}/${container}/${image.name}?${sasKey}`;
            console.log(login)
            //let blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
            //blockBlobClient.uploadBrowserData(file);
        }
    }

    return (
        <div>
            {!success ?
                <div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Titel</label>
                            <div>
                                <input onChange={handleChange} defaultValue={item.title}
                                    type="text" name="title" id="title" placeholder="Titel" />
                            </div>
                            {titleError && <div className={styles.error}>{titleError}</div>}
                        </div>
                        <div>
                            <label>Preis</label>
                            <div>
                                <input onChange={changePrice} defaultValue={0}
                                    type="number" step="0.01" name="preis" id="preis" placeholder="Preis" />
                            </div>
                        </div>
                        <div>
                            <div className={styles.files}>
                                <label>Bilder Hochladen</label>
                                <input onChange={onImageChange} onInput={onImageChange} type="file" multiple />
                            </div>
                            {imgError && <p className={styles.error}>{imgError}</p>}
                        </div>
                        <Button type={"submit"} disabled={titleError || imgError}
                            text={"Erstellen"} />
                        <Button onClick={handleCancel} text={"Abbrechen"} />
                    </form>
                </div> :
                <div>
                    <h2>Event wurde erfolgreich erstellt</h2>
                </div>
            }
        </div>
    )
}

export async function getStaticProps() {
    const body = await CredentialsAPI.get();
    const url = body.url
    const sasKey = body.sasKey
    return {
        props: { url, sasKey }, revalidate: 30
    }
}