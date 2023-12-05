import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconCirclePlus, IconSettingsFilled, IconTrashFilled } from "@tabler/icons-react";
import TitleH1 from "../components/TitleH1";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";

export default function CreateGame() {

    const { idGame } = useParams()

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [edition, setEdition] = useState('')
    const [members, setMembers] = useState([])
    const [member, setMember] = useState('')
    const [member_edit, setMemberEdit] = useState('')
    const [member_id, setMemberId] = useState('')

    const [showModal, setModal] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEditionChange = (e) => {
        console.log(e.target.value)
        setEdition(e.target.value);
    }
    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    }
    const handleMemberChange = (e) => {
        setMember(e.target.value);
    }
    const handleMemberEditChange = (e) => {
        setMemberEdit(e.target.value);
    }

    const addMember = () => {
        let newMember = { id: members.length + 1, name: member}
        setMembers([...members, newMember])
        setMember('')
    }
    
    const deleteMember = (uid) => {
        let newMembers = members.filter( (member)=> member.id !== uid);
        setMembers(newMembers)
    }

    const editMember = (uid) => {
        setMemberId(uid)
        let memberToEdit = members.filter( (member)=> member.id === uid)
        setMemberEdit(memberToEdit[0].name)
        console.log("Miembro a editar:", memberToEdit[0].name)
    }

    const saveMemberEdit = (e, uid) => {
        e.preventDefault();

        console.log("Miembro antes de guardar editar:", member_edit)

        const newName = member_edit;

        console.log("Valor de member_edit:", newName)

        const updatedMemebers = members.map(item => {
            console.log(item, uid)
            if(item.id != uid) {
                return item
            } else {
                return {
                    ...item,
                    name: newName
                }
            }
        })

        setMembers(updatedMemebers);
        closeModal();
    }

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()


        fetch(`http://www.localhost:8083/games`, {
            method: "POST",
            headers: {
                'content-type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({ name, genre, members, edition })
        })
        .then( res => res.json())
        .then( res => {
            console.log(res)
            if(res) {
                navigate('/dashboard/manage-games', {replace: true})
            } else {
                navigate(`/dashboard/edit-game/${idGame}`, {replace: true})
            }
        })
    }

    return (
            <>
            <div className="flex items-center justify-center flex-col relative">
                <div className="text-center mt-10 mb-10">
                    <TitleH1>Ingresar un nuevo juego</TitleH1>
                    <div className="my-10 pb-10">
                        <form id="form" onSubmit={handleFormSubmit} className="max-w-2xl mt-5" encType="application/x-www-form-urlencoded">
                            <Input className="mb-6" variant="flat" size="sm" type="text" label="Nombre" name="name" id="name" onChange={handleNameChange} value={name} />
                            
                            <Input className="mb-6" variant="flat" size="sm" type="text" label="Género" name="genre" id="genre" onChange={handleGenreChange} value={genre} />
                            
                            <Select
                            label="Edición del juego"
                            placeholder="Año de edición del juego"
                            className="w-full mb-6"
                            size="sm"
                            name="edicion" 
                            id="edicion" 
                            onChange={handleEditionChange} 
                            value={edition}
                            >
                                <SelectItem key="2023" value="2023">2023</SelectItem>
                                <SelectItem key="2024" value="2024">2024</SelectItem>
                                <SelectItem key="2025" value="2025">2025</SelectItem>
                                <SelectItem key="2026" value="2026">2026</SelectItem>
                                <SelectItem key="2027" value="2027">2027</SelectItem>
                                <SelectItem key="2028" value="2028">2028</SelectItem>
                            </Select>

                            <div className="flex items-start gap-2">
                                <Input
                                    label="Miembros"
                                    placeholder="Ingresar nombres de los desarrolladores"
                                    className="w-full mb-6"
                                    id="members"
                                    value={member} 
                                    onChange={handleMemberChange}
                                />
                                <Button type="button" className="bg-[#32ADC1] p-2 rounded-xl h-[56px]" onClick={addMember}>
                                    <IconCirclePlus size={26} strokeWidth={1} />
                                </Button >
                            </div>
                            <ul className="my-8">
                                {
                                    members.map((member, index) =>
                                    <li key={index} className="text-[#ABDAE5] mb-5 grid grid-cols-6 gap-1 text-l justify-center items-center ">
                                        <div className="col-start-1 col-end-5">{member.name}</div>
                                        <div className="flex justify-end">
                                            <button type="button" className="bg-blue-500 p-2 rounded-md hover:bg-blue-400 active:bg-blue-600" onClick={() => { editMember(member.id), openModal()} }>
                                                <IconSettingsFilled size={24} strokeWidth={1} />
                                            </button >
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="button" className="bg-red-500 p-2 rounded-md hover:bg-red-400 active:bg-red-600" onClick={() => deleteMember(member.id)}>
                                                <IconTrashFilled  size={24} strokeWidth={1} />
                                            </button >
                                        </div>
                                    </li>
                                    )
                                }
                                {
                                    members == '' &&
                                    <li className="text-[#ABDAE5]">No hay Miembros cargados</li>
                                }
                            </ul>
                            <div className="border-t-2 border-[#ABDAE5]">
                                <Button className="text-md w-full mt-8 mb-4 font-medium bg-[#32ADC1]" type="submit" radius="sm" size="sm">
                                    Guardar
                                </Button>
                            </div>
                        </form>
                        <Button className="text-md w-full mt-5 mb-4 font-medium text-white bg-red-500" radius="sm" size="sm">
                            <Link to="/dashboard/manage-games">Cancelar</Link>
                        </Button>
                    </div>
                </div>
            </div>
            {
                showModal &&
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className="bg-[#1D7294] px-8 py-10 rounded-md z-50 ">
                    <h1 className="text-2xl mb-4 font-bold text-[#ABDAE5]">Editar Miembro {member_id}</h1>
                        <form onSubmit={ (e) => { saveMemberEdit(e, member_id) }}>
                            <div className="mb-8">
                                <label htmlFor="member_edit">Miembro</label>
                                <Input id="member_edit" className="w-full rounded pt-4 mb-0" value={member_edit} onChange={handleMemberEditChange} />
                            </div>
                            <div className="flex justify-end w-full gap-2">
                                <Button radius="sm" size="sm" type="button" className="bg-red-500 text-md px-7 py-2 rounded-md text-white font-medium w-full" onClick={closeModal}>Cancelar</Button>
                                <Button radius="sm" size="sm" type="sumbit" className="bg-[#32ADC1] text-md px-7 py-2 rounded-md text-white font-medium w-full">Guardar</Button>
                           </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
