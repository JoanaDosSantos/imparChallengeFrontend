import { IPhoto } from "./photo";
export interface ICar extends ICarRoot{
    id: number,
    photoId: number,
    photo: IPhoto
}
interface ICarRoot {
    name: string,
    status: string
}
export interface ICreateCar extends ICarRoot {
    photo: Omit<IPhoto, 'id'>
}

export interface IFullCar {
    cars: Array<ICar>,
    totalCars: number
}