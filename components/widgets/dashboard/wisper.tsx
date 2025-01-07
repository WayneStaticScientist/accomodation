import { Fieldset } from "primereact/fieldset";
import { ReactNode } from "react";

interface WisperCardProps {
    title: string;
    price: string;
    rate: string;
    comment: string;
}

const WisperCard = ({ title, price, rate, comment }: WisperCardProps) => {
    return (<div className="bg-cards p-3 rounded-lg drop-shadow-md h-36 flex flex-col justify-between">
        <div className="flex justify-between text-sm text-gray-500 ">
            <div>{title}</div>
            <div>All</div>
        </div>
        <span className="font-bold text-xl ">{price}</span>
        <span className="text-sm  "><span className="text-red-500 mr-2">{rate}</span>
            {comment}</span>
    </div>)
}
export default WisperCard

interface OpaqHeaderProps {
    title: string;
    icon: ReactNode,
    message: string;
    className?: string;
}

export const OpaqHeader = ({ title, message, className, icon }: OpaqHeaderProps) => {
    return <Fieldset className="bg-cards text-foreground shadow-lg" legend={<div className={`${className} text-white h-fit w-fit flex-shrink-0
    p-6 rounded-md `}>{icon}</div>}>
        <div className="flex justify-between">
            <span>{title}</span>
            <span className="font-extrabold">{message}</span>
        </div>
    </Fieldset>
}