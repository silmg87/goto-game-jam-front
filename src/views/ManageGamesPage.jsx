import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../contexts/userDatacontext";

export default function ManageGames() {

    const { contextUserData } = useContext(UserContext)

    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8083/games', {
            method: 'GET',
            headers: {
                'auth-token' : localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else if(response.status == 401) {
                navigate('/login', {replace: true})
            }
        })
        .then(data => {
            setGames(data)
        })
    }, [navigate]) 

    return (
            <>
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-slate-600 font-bold text-4xl pt-14 text-center">Administrar Juegos</h1>
                    <div className="max-w-4xl w-full p-6 mx-3 my-14 lg:grid lg:grid-cols-2 lg:gap-8">
                    {
                       games.map((game) => 
                       <article key={game._id} className="flex flex-col gap-5 s:flex-row s:flex-wrap shadow-lg mx-auto max-w-[470px] border-l-8 border border-green-700 rounded p-5 mb-8 lg:mb-0" >
                        <div className="s:grid s:grid-cols-3 flex flex-col gap-5 justify-items-end">
                            <div className="col-span-1 flex flex-col justify-between gap-5">
                                <p className="text-xl text-green-700 font-bold">
                                    ID : {game._id}
                                </p>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {game.name}
                                </h2>
                                <div className="col-span-2">
                                    <ul className="font-normal text-gray-700 antialiased">
                                        <li>
                                            <span className="mr-2 inline-block font-semibold text-lg text-slate-600">Genero: </span>{game.genre}
                                        </li>
                                        <li>
                                            <span className="mr-2 inline-block font-semibold text-lg text-slate-600">Edición: </span>{game.edition}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="gap-5 flex w-full">
                            {
                                contextUserData.rol == 'admin' &&
                                <>
                                    <div className="w-full">
                                        <Link to={`/dashboard/edit-game/${game._id}`}className="uppercase w-full block rounded py-1.5 px-3 text-center align-middle text-white font-semibold bg-cyan-500  hover:bg-cyan-400 active:bg-cyan-600 transition disabled:bg-slate-200">Editar</Link>
                                    </div>
                                    <div className="w-full">
                                        <Link to={`/dashboard/delete-game/${game._id}`} className="uppercase w-full block rounded py-1.5 px-3 text-center align-middle text-white font-semibold bg-red-500  hover:bg-red-400 active:bg-red-600 transition disabled:bg-slate-200">Eliminar</Link>  
                                    </div>
                                </>
                            }
                            {
                                contextUserData.rol == 'judge' &&
                                <>
                                    <div className="w-full">
                                        <Link to={`/panel/add-vote/${game._id}`}className="uppercase w-full block rounded py-1.5 px-3 text-center align-middle text-white font-semibold bg-cyan-500  hover:bg-cyan-400 active:bg-cyan-600 transition disabled:bg-slate-200">Votar</Link>
                                    </div>
                                </>
                            }
                        </div>
                       </article>
                       )
                    }
                    </div>
                </div>
        </>
    )
}
