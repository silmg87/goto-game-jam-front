import { useContext } from "react"
import { UserContext } from "../contexts/userDatacontext";
import { Link } from "react-router-dom";
import { IconSquareRoundedPlus, IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import TitleH1 from "../components/TitleH1";
import TitleH2 from "../components/TitleH2";

export default function Dashboard() {

    const { contextUserData } = useContext(UserContext)

    return (
        <>
        <div className="flex items-center justify-center flex-col relative">
            <div className="text-center mt-10 mb-10">
                <TitleH1>Dashboard</TitleH1>
                <section className="my-10 flex gap-5 flex-col justify-center items-center text-center sm:flex-row sm:text-left">
                    <div>
                        <Avatar className="w-20 h-20 text-large" icon={<AvatarIcon />} 
                            classNames=
                            {{
                                base: "bg-gradient-to-br from-[#ABDAE5] to-[#32ADC1]",
                                icon: "text-black/80",
                            }} 
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <TitleH2> {contextUserData.name} {contextUserData.surname}</TitleH2>
                        <p className="font-semibold text-[#ABDAE5]">{ contextUserData.email }</p>
                        <p className="font-semibold text-[#ABDAE5] capitalize">{ contextUserData.rol }</p>
                    </div>
                </section>
                <section className="my-10 rounded-lg bg-[#ABDAE5]/5 p-6 shadow-lg">
                    <TitleH2>Administrar Juegos</TitleH2>
                    <ul className="mt-5">
                        <li className="mb-4 flex items-center gap-4 ml-0 md:ml-4">
                            <IconSquareRoundedPlus size="30" strokeWidth="2" color="white"/>
                            <Link to="/dashboard/add-game" className="text-[#ABDAE5] text-[18px] hover:opacity-75">
                                Nuevo Juego
                            </Link>
                        </li>
                        <li className="flex items-center gap-4 ml-0 md:ml-4">
                            <IconAdjustmentsHorizontal size="30" strokeWidth="2" color="white"/>
                            <Link  to="/dashboard/manage-games" className="text-[#ABDAE5] text-[18px] hover:opacity-75">
                                Ver Juegos
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        </>
    )
}
