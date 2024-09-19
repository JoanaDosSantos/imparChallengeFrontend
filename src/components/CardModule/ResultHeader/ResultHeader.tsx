import { useState } from "react";
import CardCreate from "../components/CardActions/CardCreate/CardCreate";
import styles from "./styles.module.scss";

export default function ResultHeader() {
    const [showNewCardModal, setShowNewCardModal] = useState(false)
    return (
        <>
            <div className={styles.headerResultDiv}>
                <h3>Resultado de Busca</h3>

                <button onClick={() => setShowNewCardModal(true)}>Novo Card</button>
            </div>

            { showNewCardModal
                ? <CardCreate closeModal={() => setShowNewCardModal(false)}/>
                : null
            }
            
        </>
    )
}