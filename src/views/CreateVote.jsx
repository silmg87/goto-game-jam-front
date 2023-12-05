import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/userDatacontext";
import TitleH1 from "../components/TitleH1";
import { Input, Button } from "@nextui-org/react";

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
                <div className="text-center my-10 w-[300px] md:w-[500px]">
                    <TitleH1>Editar Juego <span className="flex flex-col mt-2 text-[#32ADC1] text-[20px]">ID: {idGame}</span></TitleH1>
                    <div className="my-10 pb-10">
                        <form id="form" onSubmit={handleFormSubmit} className="mx-3">                     
                            
                            <div className="mb-5 flex gap-2 items-center justify-between">
                                <label htmlFor="name" className="text-[#32ADC1] font-semibold">Arte</label>
                                <Input
                                    type="number"
                                    placeholder="Puntaje" 
                                    id="art" 
                                    onChange={handleArtChange} 
                                    value={art} 
                                    className="w-[90px]"
                                    size="sm"
                                />
                            </div>

                            <div className="mb-5 flex gap-2 items-center justify-between">
                                <label htmlFor="name" className="text-[#32ADC1] font-semibold">Jugabilidad</label>
                                <Input
                                    type="number"
                                    placeholder="Puntaje" 
                                    id="gameplay" 
                                    onChange={handleGameplayChange} 
                                    value={gameplay} 
                                    className="w-[90px]"
                                    size="sm"
                                />
                            </div>

                            <div className="mb-5 flex gap-2 items-center justify-between">
                                <label htmlFor="name" className="text-[#32ADC1] font-semibold">Sonido</label>
                                <Input
                                    type="number"
                                    placeholder="Puntaje" 
                                    id="sound" 
                                    onChange={handleSoundChange}
                                    value={sound} 
                                    className="w-[90px]"
                                    size="sm"
                                />
                            </div>

                            <div className="mb-5 flex gap-2 items-center justify-between">
                                <label htmlFor="name" className="text-[#32ADC1] font-semibold">Afinidad Temática</label>
                                <Input
                                    type="number"
                                    placeholder="Puntaje" 
                                    id="thematic_affinity" 
                                    onChange={handleThematicAffinityChange}
                                    value={thematic_affinity} 
                                    className="w-[90px]"
                                    size="sm"
                                />
                            </div>
                            <div className="border-t-2 border-[#ABDAE5]">
                                <Button className="w-full text-md mt-8 mb-4 font-medium bg-[#32ADC1]" type="submit" radius="sm" size="sm">
                                    Guardar voto
                                </Button>
                            </div>                                                                                      
                        </form>
                        
                        <Button className="w-[276px] md:w-[480px] text-md my-4 mx-auto  font-medium text-white bg-red-500" radius="sm" size="sm">
                            <Link to="/panel/games">Cancelar</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}