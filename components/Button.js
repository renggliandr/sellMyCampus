import styles from "./Button.module.css"

export default function Button(props) {

    return (
        <button className={styles.button} type={props.type} disabled={props.disabled}
                onClick={props.onClick}>{props.text}</button>
    )
}