import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconCirclePlus, IconSettingsFilled, IconTrashFilled } from "@tabler/icons-react";
import { Input } from "@nextui-org/react";

export default function EditGame() {

    const { idGame } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://www.localhost:8083/games/${idGame}`,{
            method: 'GET',
         }
        ).then(response => response.json())
            .then(data => {
                    setName(data.name)
                    setGenre(data.genre)
                    setEdition(data.edition)
                    setMembers(data.members)
            })
    }, [idGame]) 

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


        fetch(`http://www.localhost:8083/games/${idGame}`, {
            method: "PATCH",
            headers: {
                'content-type' : 'application/json'
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
                <div className="max-w-3xl w-full px-6">
                    <h1 className="text-slate-600 font-bold text-4xl pt-14 text-left">Editar Juego ID {idGame}</h1>
                    <div className="my-10 pb-10">
                        <form id="form" onSubmit={handleFormSubmit}>
                            <div className="mb-5">
                                <label htmlFor="name">Nombre</label>
                                <Input type="text" id="name" onChange={handleNameChange} value={name} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="genre">Género</label>
                                <input type="text" id="genre" onChange={handleGenreChange} value={genre} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="edicion">Edición</label>
                                <select className="w-full border border-orange-500 rounded p-2 bg-white disabled:bg-gray-200" name="edicion" id="edicion" onChange={handleEditionChange} value={edition}>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                </select>
                            </div>
                            <div className="pb-8 border-b-2 border-gray-300">
                                <label htmlFor="members">Miembros</label>
                                <div className="flex items-start gap-2">
                                    <textarea id="members" className="w-full border border-orange-500 rounded p-2 resize-none mb-0 h-[70px]" 
                                    value={member} onChange={handleMemberChange}></textarea>
                                    <button type="button" className="bg-blue-500 p-2 rounded-md hover:bg-blue-400 active:bg-blue-600 h-[70px] w-[60px]" onClick={addMember}>
                                        <IconCirclePlus size="100%" strokeWidth={1}/>
                                    </button >
                                </div>
                            </div>
                            <ul className="my-8 border-t-2 border-b-2 border-gray-500 py-5">
                                {
                                    members.map((member, index) =>
                                    <li key={index} className="grid grid-cols-6 gap-1 text-l justify-center items-center my-5">
                                        <div className="col-start-1 col-end-5">{member.name}</div>
                                        <div className="flex justify-end">
                                            <button type="button" className="bg-blue-500 p-2 rounded-md hover:bg-blue-400 active:bg-blue-600" onClick={() => { editMember(member.id), openModal()} }>
                                                <IconSettingsFilled size={26} strokeWidth={1} />
                                            </button >
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="button" className="bg-red-500 p-2 rounded-md hover:bg-red-400 active:bg-red-600" onClick={() => deleteMember(member.id)}>
                                                <IconTrashFilled  size={26} strokeWidth={1} />
                                            </button >
                                        </div>
                                    </li>
                                    )
                                }
                                {
                                    members == '' &&
                                    <li>No hay Miembros cargados</li>
                                }
                            </ul>
                            <div className="border-t-2 border-gray-300">
                                <button className="mt-8">Guardar Cambios</button>
                            </div>
                        </form>
                        <div>
                            <Link className="w-full block rounded p-1.5 mt-8 text-white font-semibold bg-red-500 hover:bg-red-400 active:bg-red-600 transition disabled:bg-slate-200 text-center" to="/dashboard/manage-games">Cancelar</Link>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModal &&
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className=" bg-white px-16 py-14 rounded-md sm:w-[400px] md:w-[600px]">
                    <h1 className="text-2xl mb-4 font-bold text-slate-500">Editar Miembro {member_id}</h1>
                        <form onSubmit={ (e) => { saveMemberEdit(e, member_id) }}>
                            <div className="mb-8">
                                <label htmlFor="member_edit">Miembro</label>
                                <textarea id="member_edit" className="w-full border border-orange-500 rounded p-2 resize-none mb-0 sm:h-[100px]" value={member_edit} onChange={handleMemberEditChange}></textarea>
                            </div>
                            <div className="flex justify-end w-full gap-2">
                                <button type="button" className="bg-red-500 hover:bg-red-400 active:bg-red-600 px-7 py-2 rounded-md text-md text-white font-semibold w-full" onClick={closeModal}>Cancelar</button>
                                <button type="sumbit" className="bg-green-500 hover:bg-green-400 active:bg-green-600 px-7 py-2 rounded-md text-md text-white font-semibold w-full">Guardar</button>
                           </div>
                        </form>
                    </div>
                </div>
            }

        </>
    )
}
