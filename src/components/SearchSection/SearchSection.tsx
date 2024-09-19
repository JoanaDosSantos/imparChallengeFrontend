import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./styles.module.scss";

export default function SearchSection() {
    return (
        <section className={styles.searchSection}>
            <div>
                <img src="/assets/imgs/main-background.png" alt="Fundo da barra de pesquisa" />
            </div>

            <SearchBar />
        </section>
    )
}