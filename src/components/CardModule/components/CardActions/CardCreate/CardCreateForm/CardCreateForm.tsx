import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCard } from "../../../../../../hooks/Card";
import { ICar } from "../../../../../../interfaces/cars";
import styles from "./styles.module.scss";

interface ICreateCardProps {
    closeModal: () => void,
    updateCar?: ICar
}
export default function CardCreateForm({ closeModal, updateCar }: ICreateCardProps) {
    const { createCard, editCard } = useCard()
    const imgInputRef = useRef<HTMLInputElement>()
    const titleInputRef = useRef<HTMLInputElement>()

    const [base64, setBase64] = useState<string>(null)

    useEffect(() => {
        if (!updateCar) return

        titleInputRef.current.value = updateCar.name
    }, [])

    async function editCar() {
        await editCard(
            {
                ...updateCar,
                name: titleInputRef.current.value,
                photo: {
                    id: updateCar.id,
                    base64: base64 ?? updateCar.photo.base64
                }
            }
        )

        closeModal()
    }

    async function createCar() {
        await createCard(
            {
                name: titleInputRef.current.value,
                status: '',
                photo: {
                    base64: base64
                }
            }
        )
        closeModal()
    }

    function loadImage() {
        imgInputRef.current.click()
    }

    function encodeImageFileAsURL(element) {
        let file = element.target.files[0];

        if (element.target.files[0].size > (5 * 1000 * 1000)) {
            toast.error('Imagem grande demais.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }

        let reader = new FileReader();

        reader.onloadend = () => {
            setBase64(reader.result.toString())
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className={styles.createFormDiv}>
            <header>
                <img src="/assets/Icon-create.svg" alt="Icone adicionar imagem" />
                <h2>Criar Card</h2>
            </header>

            <form>
                <div>
                    <label>DIGITE UM NOME PARA O CARD</label>
                    <input type="text" placeholder="Digite o título" ref={titleInputRef} />
                </div>

                <div>
                    <label>INCLUA UMA IMAGEM PARA APARECER NO CARD</label>
                    <input type="text" disabled placeholder={base64 ? 'Arquivo carregado' : "Nenhum arquivo selecionado"} />
                    <button type="button" onClick={loadImage}>Escolher arquivo</button>
                    <div className={styles.inputFileDiv}>
                        <input ref={imgInputRef} type="file" onChange={encodeImageFileAsURL} placeholder="Nenhum arquivo selecionado" />
                    </div>
                </div>

                <footer>
                    <button type="button" onClick={updateCar ? editCar : createCar}>{updateCar ? 'Atualizar card': 'Criar card'}</button>
                </footer>
            </form>
        </div>
    )
}