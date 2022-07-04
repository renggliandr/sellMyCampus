import { useEffect, useState } from "react";
import Button from "./Button";
import { router } from "next/router";
import styles from "./ItemForm.module.css"
import ItemAPI from "../lib/api/Items";

import {useGlobalContext} from "../store";


export default function ItemForm({url, sasKey, highestId, items }) {

    const { session } = useGlobalContext()

    let idNew = null
    for(let i = 0; i<items.length; i++)
    {
        if(items[i].published == highestId[0]){
            idNew = (parseInt(items[i].id) + 1).toString()
        }
    }
    if(idNew == null){
        idNew = "1"
    }
    
    let id
    let username
    if(session == null){
        id = 0
        username = ""
    } else{
        id = session.id
        username = session.username
    }

    let today = new Date(), 
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()


    const defaultItem = {
        id: idNew,
        title: "",
        price: 0,
        user: [{
            userid: id,
            name: username
        }],
        published: date,
        status: "",
        user: [{
            userid: "",
            name: ""
        }],
        subtitle: "",
        description: "",
        images: [{
            path: ""
        }]
    }
    
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

    const changeSubtitle = (e) => {
        setItem(
            {
                ...item,
                ...{ subtitle: e.target.value }
            }
        )
    }

    const changeDescription = (e) => {
        setItem(
            {
                ...item,
                ...{ description: e.target.value }
            }
        )
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
            try{
                await ItemAPI.create(item)
            }catch (e){

            }
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
                const name = `${item.title}_${item.price}_${i}.${files[i].name.split(".")[files[i].name.split(".").length-1]}`
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
            let blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
            blockBlobClient.uploadBrowserData(image);
        }
    }


    return (
        <> {session ? <div>
        {!success ?
            <div>
                <h1>Neues Item erstellen</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <label htmlFor="title" className={styles.label}>Titel <strong className={styles.red}>*</strong></label>
                        <div className={styles.inputField}>
                            <input onChange={handleChange} defaultValue={item.title}
                                type="text" name="title" id="title" placeholder="Titel" />
                        </div>
                        {titleError && <div className={styles.error}>{titleError}</div>}
                    </div>
                    <div className={styles.input}>
                        <label className={styles.label}>Preis</label>
                        <div className={styles.inputField}>
                            <input onChange={changePrice} defaultValue={0}
                                type="number" step="0.05" name="preis" id="preis" placeholder="Preis" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label className={styles.label}>Untertitel</label>
                        <div className={styles.inputField}>
                            <input onChange={changeSubtitle}
                                type="text" name="subtitle" id="subtitle" placeholder="Untertitel" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label className={styles.label}>Beschreibung</label>
                        <div className={styles.inputField}>
                            <input onChange={changeDescription} 
                                type="text" name="description" id="description" placeholder="Beschreibung" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label className={styles.label}>Bilder Hochladen</label>
                        <div className={styles.files}>
                            <input className={styles.inputField} onChange={onImageChange} onInput={onImageChange} type="file" multiple />
                        </div>
                        {imgError && <p className={styles.error}>{imgError}</p>}
                    </div>
                    <button disabled={titleError} type="submit" className={styles.btnSubmit}
                        >Erstellen</button>
                    <button onClick={handleCancel} className={styles.btnCancel}>Abbrechen</button>
                </form>
            </div> :
            <div>
                <h2>Event wurde erfolgreich erstellt</h2>
            </div>
        }
    </div> : <p>Für diesen Bereich müssen Sie eingeloggt sein. <a href="/login">Hier</a> geht es zum Login.</p>}
        </>
        
    )
}

