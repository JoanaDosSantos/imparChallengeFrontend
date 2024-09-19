import { useState } from "react";
import { useCard } from "@/hooks/Card";
import styles from "./styles.module.scss";

export default function SearchBar() {
    const { searchTerm, setSearchTerm, searchCar } = useCard()

    const [showingResults, setShowingResults] = useState<boolean>(false)

    function handleInputChange(inputValue: string) {
        setSearchTerm(inputValue.toLowerCase())
    }

    async function search() {
        if (!searchTerm) return

        searchCar(searchTerm, true)

        setShowingResults(true)
    }

    async function clearSearch() {
        setSearchTerm('')
        searchCar('', true)
        setShowingResults(false)
    }

    return (
        <section className={styles.searchSection}>
            <input
                type="text"
                placeholder="Digite aqui sua busca..."
                onChange={e => handleInputChange(e.target.value)}
                value={searchTerm ?? ''}
            />

            {
                showingResults
                    ? <img src="/assets/Icon-close.svg" alt="Limpar Busca" onClick={clearSearch} />
                    : <img src="/assets/Icon-magnifier.svg" alt="Icone de Busca" onClick={search} />
            }

        </section>
    )
}