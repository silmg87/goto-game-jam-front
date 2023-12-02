import { useContext } from "react"
import { UserContext } from "../contexts/userDatacontext";
import { Link } from "react-router-dom";
import {IconUserCircle, IconSquareRoundedPlus, IconAdjustmentsHorizontal } from "@tabler/icons-react";


export default function Dashboard() {

    const { contextUserData } = useContext(UserContext)

    return (
        <>
        <div className="flex items-center justify-center flex-col relative">
            <div className="max-w-3xl w-full px-6 mb-14">
                <h1 className="text-slate-600 font-bold text-4xl pt-14 text-center sm:text-left">Dashboard</h1>
                <section className="my-10 flex gap-4 flex-col items-center text-center sm:flex-row sm:text-left">
                    <div className="w-[125px] h-[125px]">
                        <IconUserCircle size="100%" strokeWidth="1.5" color="green" className=" drop-shadow-lg"/>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-slate-600 font-semibold text-2xl"> {contextUserData.name} {contextUserData.surname}</h2>
                        <p className="font-semibold">{ contextUserData.email }</p>
                        <p className="font-semibold capitalize">{ contextUserData.rol }</p>
                    </div>
                </section>
                <section className="my-10 border rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-6 text-slate-600 font-semibold text-3xl">Administrar Juegos</h2>
                    <ul>
                        <li className="ml-4 mb-4 flex items-center gap-4">
                            <IconSquareRoundedPlus size="30" strokeWidth="2" color="green"/>
                            <Link to="/dashboard/add-game" className="text-blue-600 text-[18px] hover:opacity-75">
                                Nuevo Juego
                            </Link>
                        </li>
                        <li className="ml-4 flex items-center gap-4">
                            <IconAdjustmentsHorizontal size="30" strokeWidth="2" color="green"/>
                            <Link  to="/dashboard/manage-games" className="text-blue-600 text-[18px] hover:opacity-75">
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
