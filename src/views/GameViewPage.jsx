import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function GameView() {

    // const [game, setGame] = useState({})
    const [votes, setVotes] = useState([])
    const [members, setMembers] = useState([])
    const [average, setAverage] = useState([])

    const { idGame } = useParams()

    // useEffect(() => {
    //     fetch(`http://www.localhost:8083/games/${idGame}`)
    //         .then(response => response.json())
    //             .then(data => {
    //                 console.log(data)
    //                 setGame(data)
    //                 setMembers(data.members)
    //         })
    // }, [idGame])

    useEffect(() => {
        fetch(`http://www.localhost:8083/games/${idGame}/votes`)
            .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setVotes(data)
            })
    }, [idGame])

    useEffect(() => {
        fetch(`http://www.localhost:8083/games/${idGame}/average`)
            .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setAverage(data)
                    setMembers(data[0].members)
            })
    }, [idGame])

    return(
        <>
            <div className="flex flex-col justify-center items-center gap-10">
                <h1>Detalle de juego</h1>

                {/* <h2>{game.name}</h2>
                <div className="flex gap-5">
                    <p>Género: {game.genre}</p>
                    <p>Edición: {game.edition}</p>
                    <p>Puntaje Total: {game.totalScore}</p>
                </div>
                <div className="flex items-center gap-5">
                    <h3 className="self-start">Desarrolladores</h3>
                    <ul>
                    {
                        members.map(member =>
                            <li key={member.id}>{member.name}</li>
                        )
                    }
                    </ul>
                </div> */}
                 {
                        average.map((average) =>
                            <div key={average.name} className="text-center">
                                <h2 className="mb-5">{average.name}</h2>
                                <div className="flex justify-center gap-5 mb-5">
                                    <p>Género: {average.genre}</p>
                                    <p>Edición: {average.edition}</p>
                                    <p>Puntaje Total: {average.totalScore}</p>
                                </div>
                                <h2 className="mb-5">Promedios</h2>
                                <div className="flex justify-center gap-5 mb-5">
                                    <p>Arte: {average.averageScores.art.toFixed(2)}</p>
                                    <p>Jugabilidad: {average.averageScores.gameplay.toFixed(2)}</p>
                                    <p>Sonido: {average.averageScores.sound.toFixed(2)}</p>
                                    <p>Afinidad Temática: {average.averageScores.thematic_affinity.toFixed(2)}</p>
                                </div>
                            </div>
                        )
                }
                <div className="flex items-center gap-5">
                    <h3 className="self-start">Desarrolladores</h3>
                    <ul>
                    {
                        members.map(member =>
                            <li key={member.id}>{member.name}</li>
                        )
                    }
                    </ul>
                </div>
                <h2>Votos</h2>
                <ul className="flex justify-around gap-8">
                {
                    votes.length != 0 &&
                    votes.map((vote) =>
                        <li key={vote.judge_name} className="border-l-5 border rounded-md border-green-700 p-5">
                            <h2>{vote.judge_name}</h2>
                            <p>Arte: {vote.art}</p>
                            <p>Jugabilidad: {vote.gameplay}</p>
                            <p>Sonido: {vote.sound}</p>
                            <p>Afinidad Temática: {vote.thematic_affinity}</p>
                        </li>
                    )
                }
                {
                    votes.length == 0 &&
                    <li>No hay votaciónes disponibles</li>
                }
                </ul>
                </div>
        </>
    )
}