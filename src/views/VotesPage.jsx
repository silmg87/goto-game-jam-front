import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userDataContext.jsx";
import { Link } from "react-router-dom";
import TitleH1 from "../components/TitleH1";
import {Card, CardHeader, CardBody, Image } from "@nextui-org/react";

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
            <div className="flex items-center justify-center flex-col relative">
                <div className="text-center my-10 mx-5">
                    <TitleH1>Administrar Votos</TitleH1>
                    {
                        judge_votes.length != 0 &&
                        judge_votes.map((vote) =>
                            <Card key={vote.game_name} className="max-w-[350px] bg-[#ABDAE5]/5 mt-8 mx-auto">
                                <CardHeader className="flex gap-3">
                                <Image
                                    alt="nextui logo"
                                    height={40}
                                    radius="sm"
                                    src="../../public/img-default.jpg"
                                    width={40}
                                    />
                                    <div>
                                    <p className="font-medium text-lg text-[#ABDAE5]">{vote.game_name}</p>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <ul className="flex flex-col justify-center gap-5 text-center">
                                        <li className="text-[#ABDAE5]">Arte: {vote.art}</li>
                                        <li className="text-[#ABDAE5]">Jugabilidad: {vote.gameplay}</li>
                                        <li className="text-[#ABDAE5]">Sonido: {vote.sound}</li>
                                        <li className="text-[#ABDAE5]">Afinidad Temática: {vote.thematic_affinity}</li>
                                    </ul>
                                </CardBody>
                            </Card>)
                    }
                    {
                        judge_votes.length == 0 &&
                        <p className="text-[#ABDAE5] mt-10">No hay votaciónes disponibles</p>
                    }
                </div>
                <Link  to="/panel" className="text-center font-medium text-[#32ADC1] text-[18px] hover:opacity-75">
                    Volver al Panel
                </Link>              
            </div>
        </>
    )
}