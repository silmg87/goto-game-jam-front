import { Link } from "react-router-dom";
import TitleH1 from "../components/TitleH1";

export default function NotFound() {
    return (
        <>
        <div className="flex items-center justify-center flex-col relative">
            <div className="text-center my-10 mx-5">
                <TitleH1>Página no encontrada</TitleH1>
                    <div className="my-10">
                        <p className="mb-4 text-[#ABDAE5]">Lo sentimos, la página que buscas no existe.</p>
                        <p className="mb-8 text-[#ABDAE5]">No te preocupes, aun puedes seguir disfrutantdo de nuestra página web</p>   
                        <Link to={"/"} className="text-[#32ADC1] font-medium hover:opacity-75 underline">
                            Haz clic aqui para volver a la Home
                        </Link>
                    </div>
            </div>
        </div>
        </>
    )
}