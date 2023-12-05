import { useContext } from "react"
import { UserContext } from "../contexts/userDatacontext";
import { IconEdit, IconGhost } from '@tabler/icons-react';
import { Link } from "react-router-dom";
import TitleH1 from "../components/TitleH1";
import TitleH2 from "../components/TitleH2";
import { Avatar, AvatarIcon } from "@nextui-org/react";


export default function Panel() {

    const { contextUserData } = useContext(UserContext)

    return (
        <>
        <div className="flex items-center justify-center flex-col relative">
        <div className="text-center my-10">
            <TitleH1>Mi Perfil</TitleH1>
            {
                contextUserData.rol != 'judge' &&
                <>
                    <section className="my-10 flex gap-4 flex-col items-center justify-center text-center sm:flex-row sm:text-left">
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
                    <section className="my-10 rounded-lg bg-[#ABDAE5]/5 p-6 shadow-lg flex flex-col justify-center">
                        <TitleH2>Proximamente...</TitleH2>
                    </section>
                </>
            }
            {
                contextUserData.rol == 'judge' &&
                <>
                    <section className="my-10 flex gap-4 flex-col items-center justify-center text-center sm:flex-row sm:text-left">
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
                    
                    <section className="my-10 rounded-lg bg-[#ABDAE5]/5 p-6 shadow-lg flex flex-col justify-center">
                    <TitleH2>Administrar Votaciones</TitleH2>
                    <ul className="mt-5">
                        <li className="mb-4 flex items-center gap-4 ml-0 md:ml-4">
                            <IconEdit size="30" strokeWidth="2" color="white"/>
                            <Link to="/panel/votes" className="text-[#ABDAE5] text-[18px] hover:opacity-75">
                                Ver Votos
                            </Link>
                        </li>
                        <li className="flex items-center gap-4 ml-0 md:ml-4">
                            <IconGhost size="30" strokeWidth="2" color="white"/>
                            <Link  to="/panel/games" className="text-[#ABDAE5] text-[18px] hover:opacity-75">
                                Votar Juegos
                            </Link>
                        </li>
                    </ul>
                </section>
                </>
            }
            </div>
        </div>
        </>
    )
}