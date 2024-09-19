import styles from './styles.module.scss'

export default function Header() {
    return (
        <header className={styles.header}>
            <img src='/assets/Icon-logo.svg' alt='Impar Logo'/>
        </header>
    )
}