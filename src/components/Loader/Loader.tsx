import styles from './Loader.module.scss'

export function Loader(){
    return (
        <>
        <div className={styles.overlay}/>
        <div className={styles.loader}/>
        </>
    )
}