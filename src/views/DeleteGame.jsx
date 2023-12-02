import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

export default function DeleteGame() {

    const [game, setGame] = useState({})
    const [members, setMembers] = useState([])
    const [showModal, setModal] = useState(false);

    const navigate = useNavigate();
    const { idGame } = useParams()

    useEffect(() => {
        fetch(`http://www.localhost:8083/games/${idGame}`)
            .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setGame(data)
                    setMembers(data.members)
            })
    }, [idGame]) 

    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch(`http://www.localhost:8083/games/${idGame}`, {
            method: "DELETE",
        })
        .then( res => res.json())
        .then( res => {
            console.log(res)
            if(res) {
                navigate('/dashboard/manage-games', {replace: true})
            } else {
                navigate(`/dashboard/delete-game/${idGame}`, {replace: true})
            }
        })
    }

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    return(
        <>
            <div className="flex items-center justify-center flex-col relative">
                <div className="max-w-3xl w-full px-6">
                <h1>Detalle de juego</h1>
                <h2>{game.name}</h2>
                <p>{game.genre}</p>
                <p>{game.edition}</p>

                <h3>Desarrolladores</h3>
                <ul>
                {
                    members.map(member => 
                        <li key={member.id}>{member.name}</li>
                    )
                }
                </ul>
                <button type="submit" onClick={openModal}>Confirmar</button>
                <div>        
                    <Link className="w-full block rounded p-1.5 mt-8 text-white font-semibold bg-red-500 hover:bg-red-400 active:bg-red-600 transition disabled:bg-slate-200 text-center" to="/dashboard/manage-games">Cancelar</Link>
                </div>
                {
                showModal &&
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className=" bg-white px-16 py-14 rounded-md sm:w-[400px] md:w-[600px]">
                    <h1 className="text-2xl mb-4 font-bold text-slate-500">Eliminar Juego {game._id}</h1>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-8">
                                <p>La acción que estas a punto de cometer es irreversible</p>
                                <p>¿Estas seguro que desas eliminar el juego {game.name} ?</p>
                            </div>
                            <div className="flex justify-end w-full gap-2">
                                <button type="button" className="bg-red-500 hover:bg-red-400 active:bg-red-600 px-7 py-2 rounded-md text-md text-white font-semibold w-full" onClick={closeModal}>Cancelar</button>
                                <button type="sumbit" className="bg-green-500 hover:bg-green-400 active:bg-green-600 px-7 py-2 rounded-md text-md text-white font-semibold w-full">Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
                }
                </div>
            </div>
               
        </>
    )
}