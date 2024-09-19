import { useState } from "react";
import { ICar } from "@/interfaces/cars";
import CardCreate from "../CardActions/CardCreate/CardCreate";
import styles from "./styles.module.scss";

interface ICardProps {
    car: ICar,
    deleteCar: (carId: number) => void
    _ref: React.LegacyRef<HTMLDivElement>
}
export default function Card({ car, deleteCar, _ref }: ICardProps) {
    const [showNewCardModal, setShowNewCardModal] = useState(false)

    return (
        <>
            <div className={styles.cardDiv} ref={_ref}>
                <div className={styles.cardContentDiv}>
                    <div>
                        <img src={car.photo.base64 ?? "/assets/Icon-magnifier.svg"} alt={car.name} />
                    </div>
                    <span>{car.name.toUpperCase()}</span>
                </div>
                <div className={styles.cardActionsDiv}>
                    <button onClick={() => deleteCar(car.id)}>
                        <span>
                            <img src="/assets/Icon-trash.svg" alt="Icone de Deleção" />
                            Excluir
                        </span>
                    </button>
                    <button onClick={() => setShowNewCardModal(true)}>
                        <span>
                            <img src="/assets/Icon-edit.svg" alt="Icone de Edição" />
                            Editar
                        </span>
                    </button>
                </div>
            </div>

            {showNewCardModal ?
                <CardCreate closeModal={() => setShowNewCardModal(false)} updateCar={car} />
                : null}
        </>
    )
}