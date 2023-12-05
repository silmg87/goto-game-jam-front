import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleH1 from "../components/TitleH1";
import TitleH2 from "../components/TitleH2";
import {Card, CardHeader, CardBody, Avatar, AvatarIcon, Button, Link} from "@nextui-org/react";

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
            <section className="container mx-auto px-2 my-20 text-center">
                <TitleH1>Detalle de juego</TitleH1>

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
                            <div key={average.name} className="text-center mt-10 mb-10">
                                <TitleH2>{average.name}</TitleH2>
                                <div className="flex flex-col justify-center mt-8 mb-12 text-[#ABDAE5] md:grid md:grid-cols-3">
                                    <p className="bg-[#ABDAE5]/5 w-[200px] my-3 mx-auto rounded-lg p-5 font-semibold">Género<span className="m-3 block text-2xl text-[#32ADC1]">{average.genre}</span></p>
                                    <p className="bg-[#ABDAE5]/5 w-[200px] my-3 mx-auto rounded-lg p-5 font-semibold">Edición<span className="m-3 block text-2xl text-[#32ADC1]">{average.edition}</span></p>
                                    <p className="bg-[#ABDAE5]/5 w-[200px] my-3 mx-auto rounded-lg p-5 font-semibold">Puntaje Total<span className="m-3 block text-2xl text-[#32ADC1]">{average.totalScore}</span></p>
                                </div>
                                <TitleH2 className="mb-5">Promedios</TitleH2>
                                <div className="flex justify-center gap-2 my-8 text-[#ABDAE5] w-[300px] mx-auto">
                                    <p className="bg-[#ABDAE5]/5 w-[140px] h-[112px] mx-auto rounded-lg p-5 font-semibold">Arte<span className="m-1 block text-[#32ADC1]">{average.averageScores.art.toFixed(2)}</span></p>
                                    <p className="bg-[#ABDAE5]/5 w-[140px] h-[112px] mx-auto rounded-lg p-5 font-semibold">Jugabilidad<span className="m-1 block text-[#32ADC1]">{average.averageScores.gameplay.toFixed(2)}</span></p>
                                </div>   
                                <div className="flex justify-center gap-2 mb-8 text-[#ABDAE5] w-[300px] mx-auto items-center content-center">
                                    <p className="bg-[#ABDAE5]/5 w-[140px] h-[112px] mx-auto rounded-lg p-5 font-semibold">Sonido<span className="m-1 block text-[#32ADC1]">{average.averageScores.sound.toFixed(2)}</span></p>
                                    <p className="bg-[#ABDAE5]/5 w-[140px] h-[112px] mx-auto rounded-lg p-5 font-semibold">Afinidad Temática<span className="m-1 block text-[#32ADC1]">{average.averageScores.thematic_affinity.toFixed(2)}</span></p>
                                </div>
                            </div>
                        )
                }
                <div className="flex flex-col items-center gap-5 mb-10 mt-12">
                    <TitleH2>Desarrolladores</TitleH2>
                    <ul className="md:grid md:grid-cols-3 mt-8">
                    {
                        members.map(member =>
                            <li className="flex items-center content-center p-3 gap-2" key={member.id}>
                                <Avatar icon={<AvatarIcon />} 
                                    classNames={{
                                        base: "bg-gradient-to-br from-[#ABDAE5] to-[#32ADC1]",
                                        icon: "text-black/80",
                                    }} 
                                />
                                <p className="text-small font-semibold leading-none text-[#32ADC1]">{member.name}</p>
                            </li>
                        )
                    }
                    </ul>
                </div>
                <div className="text-center mb-10 mt-12">
                    <TitleH2>Votos</TitleH2>
                    <div className="md:grid md:grid-cols-3 mt-8">
                        {
                            votes.length != 0 &&
                            votes.map((vote) =>
                                <Card key={vote.judge_name} className="max-w-[250px] mx-auto my-5 rounded-lg p-5 bg-[#ABDAE5]/5 shadow-md">
                                    <CardHeader className="justify-between">
                                        <div className="flex gap-2">
                                        <Avatar icon={<AvatarIcon />} 
                                            classNames={{
                                                base: "bg-gradient-to-br from-[#ABDAE5] to-[#32ADC1]",
                                                icon: "text-black/80",
                                            }} 
                                        />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-[#32ADC1]">{vote.judge_name}</h4>
                                        </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-3 py-0 text-small text-[#ABDAE5]">
                                        <p>Arte: {vote.art}</p>
                                        <p>Jugabilidad: {vote.gameplay}</p>
                                        <p>Sonido: {vote.sound}</p>
                                        <p>Afinidad Temática: {vote.thematic_affinity}</p>
                                    </CardBody>
                                </Card>
                            )
                        }
                        {
                            votes.length == 0 &&
                                <p className="m-3 text-xl text-[#ABDAE5]">No hay votaciones disponibles.</p>
                        }
                    </div>   
                </div>
            </section>
        </>
    )
}