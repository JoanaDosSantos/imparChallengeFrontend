import { ReactNode } from "react";
import { CardProvider } from "@/hooks/Card";

interface IProps {
    children: ReactNode
}
export function GlobalContext({ children }: IProps) {
    return (
        <CardProvider>
            {children}
        </CardProvider>
    );
}