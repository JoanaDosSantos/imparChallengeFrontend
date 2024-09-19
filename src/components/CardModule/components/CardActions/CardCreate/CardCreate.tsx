import { ICar } from "../../../../../interfaces/cars";
import styles from "./styles.module.scss";
import CardCreateForm from "./CardCreateForm/CardCreateForm";

interface ICreateCardProps {
    closeModal: () => void
    updateCar?: ICar
}
export default function CardCreate({ closeModal, updateCar }: ICreateCardProps) {
    return (
        <>
            <div className={styles.cardCreateDiv} onClick={closeModal} />

            <div className={styles.cardCreateFormDiv}>
                <CardCreateForm closeModal={closeModal} updateCar={updateCar}/>
            </div>
        </>
    )
}