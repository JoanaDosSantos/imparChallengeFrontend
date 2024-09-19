import styles from "./styles.module.scss";
import CardDeleteModal from "./CardDeleteModal/CardDeleteModal";

interface IDeleteCardModalProps{
    carId: number
    closeModal: () => void
}

export default function CardDelete({closeModal, carId}: IDeleteCardModalProps){
    return (
        <div className={styles.deleteModalDiv} onClick={closeModal}>
            <CardDeleteModal closeModal={closeModal} carId={carId}/>
        </div>
    )
}