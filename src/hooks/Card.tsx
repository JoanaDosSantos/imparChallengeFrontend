import { AxiosResponse } from 'axios';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { ICar, ICreateCar, IFullCar } from '../interfaces/cars';
import { httpRequest } from '../providers/customAxios';
import { emmitToaster } from '../providers/Utils';

interface CardProps {
    children: ReactNode;
}

interface CardContextData {
    createCard: (cardBody: ICreateCar) => Promise<void>
    deleteCard: (cardId: number) => Promise<void>
    editCard: (car: ICar) => Promise<void>
    searchCar: (carName: string, resetCars?: boolean, limit?: number, offset?: number) => Promise<number>
    cars: Array<ICar>
    isLoading: boolean,
    searchTerm: string,
    setSearchTerm: Dispatch<SetStateAction<string>>
    loadNewPage: () => void
}

const CardContextData = createContext<CardContextData>({} as CardContextData);

export function CardProvider({ children }: CardProps) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const defaultItemsPerPage = 12;
    const [cars, setCars] = useState<Array<ICar>>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [carsCount, setCarsCount] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isLastPage, setIsLastPage] = useState(false)

    useEffect(() => {
        searchCar(searchTerm)

        if (carsCount <= (currentPage * defaultItemsPerPage)) setIsLastPage(true)

    }, [currentPage])

    function loadNewPage() {
        if (isLastPage) return;
        setCurrentPage(currentPage + 1);
    }

    async function searchCar(carName: string, resetCars: boolean = false, limit: number = defaultItemsPerPage, offset: number = currentPage) {
        try {
            setIsLoading(true)
            const { data: carsResponse } = await httpRequest.get<IFullCar>(backendUrl + `Cars/search/?${carName ? `term=${carName}&` : ''}limit=${limit}&offset=${offset}`, { headers: { "Access-Control-Allow-Origin": "*" } })

            setCars(prev => {
                if (resetCars) return carsResponse.cars;

                const newCars = [...carsResponse.cars, ...prev.filter(car => !carsResponse.cars.map(_c => _c.id).includes(car.id))]

                return newCars
            })
            setCarsCount(carsResponse.totalCars)
            setIsLoading(false)

            return carsResponse.totalCars

        } catch (err) {
            setIsLoading(false)
            emmitToaster('error', 'Erro ao carregar cards.');
        }
    }

    async function createCard(cardBody: ICreateCar) {
        try {
            setIsLoading(true)
            await httpRequest.post<ICreateCar, AxiosResponse<ICar>>(backendUrl + `Cars`, cardBody)

            await searchCar(searchTerm)

            setIsLoading(false)
            emmitToaster('success', 'Criado com sucesso.');

        } catch (error) {
            setIsLoading(false)
            emmitToaster('error', 'Erro ao criar card.');
        }
    }

    async function deleteCard(cardId: number) {
        try {
            setIsLoading(true)
            await httpRequest.delete<ICar>(backendUrl + `Cars/${cardId}`)

            await searchCar(searchTerm, true)

            setIsLoading(false)
            emmitToaster('success', 'Removido com sucesso.');

        } catch (error) {
            setIsLoading(false)
            emmitToaster('error', 'Erro ao remover card.');
        }
    }

    async function editCard(car: ICar) {
        try {
            setIsLoading(true)
            await httpRequest.put<ICar, AxiosResponse<number>>(backendUrl + `Cars/${car.id}`, car)
            await searchCar(searchTerm, true)

            setIsLoading(false)
            emmitToaster('success', 'Atualizado com sucesso.');

        } catch (error) {
            setIsLoading(false)
            emmitToaster('error', 'Erro ao atualizar card.');
        }
    }

    return (
        <CardContextData.Provider value={{
            cars,
            createCard,
            deleteCard,
            editCard,
            isLoading,
            searchCar,
            searchTerm,
            setSearchTerm,
            loadNewPage
        }}>
            {children}
        </CardContextData.Provider>
    )
}

export function useCard() {
    const context = useContext(CardContextData);
    return context;
}