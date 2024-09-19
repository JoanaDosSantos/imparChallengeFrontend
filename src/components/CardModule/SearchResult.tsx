import CardList from "./components/CardList/CardList";
import ResultHeader from "./ResultHeader/ResultHeader";
import styles from "./styles.module.scss";

export default function DataContent() {
    return (
        <>
            <section className={styles.resultSearchSection}>
                <ResultHeader />

                <CardList />
            </section>
        </>
    )
}