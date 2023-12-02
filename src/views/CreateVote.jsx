import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/userDatacontext";

export default function CreateVote() {

    const { contextUserData } = useContext(UserContext)
    const judge_id = contextUserData.id

    const navigate = useNavigate()

    const { idGame } = useParams()

    const [art,               setArt] = useState('');
    const [gameplay,          setGameplay] = useState('');
    const [sound,             setSound] = useState('');
    const [thematic_affinity, setThematicAffinity] = useState('');

    const handleArtChange = (e) => {
        setArt(parseInt(e.target.value))
    }
    const handleGameplayChange = (e) => {
        setGameplay(parseInt(e.target.value))
    }
    const handleSoundChange = (e) => {
        setSound(parseInt(e.target.value))
    }
    const handleThematicAffinityChange = (e) => {
        setThematicAffinity(parseInt(e.target.value))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch(`http://www.localhost:8083/games/${idGame}/votes`, {
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({ judge_id, art, gameplay, sound, thematic_affinity })
        })
        .then( res => res.json())
        .then( res => {
            console.log(res)
            if(!res.message) {
                navigate('/panel/games', {replace: true})
            } else {
                navigate(`/panel/add-vote/${idGame}`, {replace: true})
            }
        })
    }

    return (
        <>
            <div className="flex items-center justify-center flex-col relative">
                <div className="max-w-3xl w-full px-6">
                    <h1 className="text-slate-600 font-bold text-4xl pt-14 text-left">Editar Juego ID {idGame}</h1>
                    <div className="my-10 pb-10">
                        <form id="form" onSubmit={handleFormSubmit}>
                            <div className="mb-5">
                                <label htmlFor="name">Arte</label>
                                <input type="text" id="name" onChange={handleArtChange} value={art} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name">Jugabilidad</label>
                                <input type="text" id="name" onChange={handleGameplayChange} value={gameplay} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name">Sonido</label>
                                <input type="text" id="name" onChange={handleSoundChange} value={sound} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name">Afinidad Temática</label>
                                <input type="text" id="name" onChange={handleThematicAffinityChange} value={thematic_affinity} />
                            </div>
                            <div className="border-t-2 border-gray-300">
                                <button type="sumbit" className="mt-8">Guardar Cambios</button>
                            </div>                                                                                    
                        </form>
                        <div>
                            <Link className="w-full block rounded p-1.5 mt-8 text-white font-semibold bg-red-500 hover:bg-red-400 active:bg-red-600 transition disabled:bg-slate-200 text-center" to="/panel/games">Cancelar</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}