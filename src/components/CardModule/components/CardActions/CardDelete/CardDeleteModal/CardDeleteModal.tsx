import { useCard } from "@/hooks/Card";
import styles from "./styles.module.scss";

interface IDeleteCardModalProps {
    closeModal: () => void
    carId: number
}
export default function CardDeleteModal({ closeModal, carId }: IDeleteCardModalProps) {
    const { deleteCard } = useCard()

    async function deleteCar(carId: number) {
        await deleteCard(carId)
        closeModal()
    }

    return (
        <div className={styles.CardDeleteModalBody}>
            <img src="/assets/Icon-trash.svg" alt="Imagem de lixo" />
            <h2>Excluir</h2>
            <span>CERTEZA QUE DESEJA EXCLUIR?</span>
            <footer>
                <button onClick={() => deleteCar(carId)}>Excluir</button>
                <button onClick={closeModal}>Cancelar</button>
            </footer>
        </div>
    )
}