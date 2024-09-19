import { useRef, useState } from "react";
import { useCard } from "@/hooks/Card";
import Card from "@/components/CardModule/components/Card/Card";
import CardDelete from "@/components/CardModule/components/CardActions/CardDelete/CardDelete";
import styles from './styles.module.scss'

export default function CardList() {
    const { cars, loadNewPage } = useCard()

    const [selectedCar, setSelectedCar] = useState<number>(null)

    const observer = useRef<IntersectionObserver | null>(null);


    function lastItemRef(node: HTMLDivElement) {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) loadNewPage()
        });

        if (node) observer.current.observe(node);
    };

    function deleteCarCard(carId: number) {
        setSelectedCar(carId)
    }

    return (
        <>
            <div className={styles.cardListDiv}>
                {
                    cars.map((car, index) =>
                        <Card car={car}
                            deleteCar={deleteCarCard}
                            _ref={cars.length === index + 1 ? lastItemRef : null}
                            key={index}
                        />
                    )
                }

            </div>

            {selectedCar
                ? <CardDelete
                    closeModal={() => setSelectedCar(null)}
                    carId={selectedCar}
                />
                : null
            }
        </>
    )
}