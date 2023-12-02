import { useState, useEffect, useContext } from "react"
import { UserContext } from "../contexts/userDataContext"
import { Link } from "react-router-dom"

export default function Votes() {

    const { contextUserData } = useContext(UserContext)

    const idJudge = contextUserData.id

    const[judge_votes, setJudgeVotes] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8083/judges/${idJudge}/votes`,{ 
            method: 'GET'
        }) 
        .then(res => res.json()
        )
        .then(data => {
            console.log(data)
            setJudgeVotes(data)
        })
    },[idJudge])

    return(
        <>
            <div className="flex flex-col justify-center items-center gap-10">
            <h1>Administrar Votos</h1>
                    <Link  to="/panel" className="text-blue-600 text-[18px] hover:opacity-75">
                        Volver al Panel
                    </Link>  
                    <ul className="flex flex-col gap-5">
                    {
                        judge_votes.length != 0 &&
                        judge_votes.map((vote) => 
                        <li key={vote.game_name} className="border-l-5 border rounded-md border-green-700 p-5">
                            <h2>{vote.game_name}</h2>
                            <p>Arte: {vote.art}</p>
                            <p>Jugabilidad: {vote.gameplay}</p>
                            <p>Sonido: {vote.sound}</p>
                            <p>Afinidad Temática: {vote.thematic_affinity}</p>
                        </li>)
                    }
                    {
                        judge_votes.length == 0 &&
                        <li>No hay votaciónes disponibles</li>
                    }
                    </ul>                  
            </div>
        </>
    )
}