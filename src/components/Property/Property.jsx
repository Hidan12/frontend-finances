import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCreateProperty, createProperty, deleteProperty, searchProperties, setProperties, updateProperty } from "../../store/actions/actionProperty.js"



const RowTable = ({Property , handlerIdDelete, handlerupdateUs})=>{
    return(
        <div className=" w-full grid grid-cols-4">
                <div className="flex flex-col items-center justify-center border-x h-[9vh] ">
                    <p className="font-bold text-black">{Property.name}</p>
                    <div className="flex items-center justify-center gap-5  h-[9vh]">
                        <button className="text-red-500 hover:text-red-700" onClick={()=>handlerIdDelete(Property)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </button>
                        <button onClick={()=>handlerupdateUs(Property)} className="text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-center border-x h-[9vh]"><p className="font-bold text-black">{Property.type}</p></div>
                <div className="flex items-center justify-center border-x h-[9vh]"><p className="font-bold text-black">{Property.price}</p></div>
                <div className="flex items-center justify-center border-x h-[9vh]"><p className="font-bold text-black">{Property.user.name}</p></div>
            </div>
    )
}

const SearchProperty = ({handlerCreateModal})=>{
    const dispatch = useDispatch()

    return(
        <div className="w-full flex justify-center items-center gap-3 my-5">
            <input type="text" onChange={(e)=> dispatch(searchProperties(e.target.value))} className="w-[25%] p-2 rounded-xl border border-solid border-blue-500" placeholder="Buscar por nombre" />
            <button onClick={()=>handlerCreateModal()} className="bg-blue-500 hover:bg-blue-800 p-2 rounded-xl text-white">Crear Propiedad</button>
        </div>
    )
}
const TableProperty = ({handlerCreateModal, handlerupdateUs})=>{
    const {token, user} = useSelector(state => state.loginReducer)
    const{properties, loading, error, deleteLoadin, searchPro}= useSelector(state => state.PropertyReducer)
    const [clickDelete, setClickDelete] = useState(false)
    const [idDelete, setIdDelete] = useState({})
    const dispatch = useDispatch()
    
    const handlerClick = ()=>{
        setClickDelete(d => d = !d)
    }
    const handlerIdDelete = (user)=>{
        setIdDelete(id => id = {_id: user._id})
        handlerClick()
    }
    useEffect(()=>{
        if (!deleteLoadin && idDelete._id) {
            dispatch(setProperties({token: token, search: searchPro}))
            setClickDelete(c => c =!c)
            setIdDelete({})
            }
        if (idDelete._id) {
            dispatch(deleteProperty({user:{_id: idDelete}, token:token }))
        }
    
    },[idDelete, deleteLoadin])
    
    if (error.error) {
        return(
            <div>
                <p>error al cargar la informacion</p>
            </div>
        )
    }
    return(
        <div className="w-full">
            <SearchProperty handlerCreateModal={handlerCreateModal}/>
            <div className="w-full">
                <div className=" w-full grid grid-cols-4">
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">nombre</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">tipo</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">precio</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">usuario</p></div>
                </div>
                {!loading && properties ? properties.map(property => <RowTable key={property._id} handlerupdateUs={handlerupdateUs} handlerIdDelete={handlerIdDelete} Property={property}/>) : "" }
                {loading ? <p>cargando informacion</p>: ""}
            </div>
        </div>
        
        
    )

}

const CreateUser = ({handlerCreateModal})=>{
    const {token} = useSelector(state => state.loginReducer)
    const {users} = useSelector(state => state.usersReducer)
    const {createPro, createError, createLoding, searchPro} = useSelector(state => state.PropertyReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [nombre, setNombre] = useState("")
    const [tipo, setTipo] = useState("")
    const [precio, setPrecio] = useState(0)
    const [user, setUser] = useState("")
    const handlerNombre = (e)=>{
        setNombre(n => n = e)
    }
    const handlerTipo = (e)=>{
        setTipo(m => m = e)
    }
    const handlerPrecio = (e)=>{
        setPrecio(c => c = e)
    }
    const handlerUser = (e)=>{
        setUser(d => d = e)
    }
    
    const handlerCreate = (e, token)=>{
        e.preventDefault()
        dispatch(createProperty({name:nombre, type:tipo, price: precio, user: user, token: token}))
    }
    useEffect(()=>{
        if (createPro) {
            dispatch(setProperties({token: token, search: searchPro}))
            handlerCreateModal()
        }else if(!createLoding && createError){
            setError(e => e = !e)
        }
    },[createPro, createError])

    return(
        <div className="absolute top-32 w-full flex justify-center">
            <div className="sticky w-[40%] flex flex-col justify-center items-center rounded-xl top-0 bg-slate-400">
                <div className="w-full grid grid-cols-2 justify-items-end">
                    <p className="font-bold text-xl">Crear Propiedad</p>
                    <button onClick={()=> handlerCreateModal()} className=" me-5 font-bold text-2xl text-red-600 hover:text-red-700" >X</button>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" onChange={(e)=> handlerNombre(e.target.value)} placeholder="Nombre" required />
                </div>
                <div className="w-[60%]">
                    <input type="email" className="w-full my-4" onChange={(e)=> handlerTipo(e.target.value)} placeholder="Tipo" required/>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" onChange={(e)=> handlerPrecio(e.target.value)} placeholder="Precio" required/>
                </div>
                <div className="w-[60%]">
                    <select className="w-full my-4" onChange={(e)=>handlerUser(e.target.value)}>
                            <option value="">Seleccione un usuario</option>
                            {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                    </select>
                </div>
                {error ? <p className="text-red-500 text-center font-semibold">Error al crear finanza</p>:""}
                <button onClick={(e)=> handlerCreate(e, token)} className="p-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white">Crear</button>
            </div>

        </div>
    )
}


const EditProp = ({handlerClicUpdate, data})=>{
    const {token} = useSelector(state => state.loginReducer)
    const {users} = useSelector(state => state.usersReducer)
    const {updatePro, updateError, updateLoadin, searchPro} = useSelector(state => state.PropertyReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [nombre, setNombre] = useState(data.name)
    const [tipo, setTipo] = useState(data.type)
    const [precio, setPrecio] = useState(data.price)
    const [user, setUser] = useState(data.user._id)
    const handlerNombre = (e)=>{
        setNombre(n => n = e)
    }
    const handlerTipo = (e)=>{
        setTipo(m => m = e)
    }
    const handlerPrecio = (e)=>{
        setPrecio(c => c = e)
    }
    const handlerUser = (e)=>{
        setUser(d => d = e)
    }
    
    const handlerCreate = (e, token)=>{
        e.preventDefault()
        dispatch(updateProperty({name:nombre, type:tipo, price: precio, user: user, id: data._id, token: token}))
    }
    useEffect(()=>{
        if (updatePro) {
            dispatch(setProperties({token: token, search: searchPro}))
            handlerClicUpdate()
        }else if(!updateLoadin && updateError){
            setError(e => e = !e)
        }
    },[updatePro, updateError])

    return(
        <div className="absolute top-32 w-full flex justify-center">
            <div className="sticky w-[40%] flex flex-col justify-center items-center rounded-xl top-0 bg-slate-400">
                <div className="w-full grid grid-cols-2 justify-items-end">
                    <p className="font-bold text-xl">Editar Propiedad</p>
                    <button onClick={()=> handlerClicUpdate()} className=" me-5 font-bold text-2xl text-red-600 hover:text-red-700" >X</button>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" value={nombre} onChange={(e)=> handlerNombre(e.target.value)} placeholder="Nombre" required />
                </div>
                <div className="w-[60%]">
                    <input type="email" className="w-full my-4" value={tipo} onChange={(e)=> handlerTipo(e.target.value)} placeholder="Tipo" required/>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" value={precio} onChange={(e)=> handlerPrecio(e.target.value)} placeholder="Precio" required/>
                </div>
                <div className="w-[60%]">
                    <select className="w-full my-4" value={user} onChange={(e)=>handlerUser(e.target.value)}>
                            <option value="">Seleccione un usuario</option>
                            {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                    </select>
                </div>
                {error ? <p className="text-red-500 text-center font-semibold">Error al editar</p>:""}
                <button onClick={(e)=> handlerCreate(e, token)} className="p-2 my-3 rounded-xl bg-blue-500 hover:bg-blue-700 text-white">Editar</button>
            </div>

        </div>
    )
}



const Property = ()=>{
    const {user} = useSelector(state => state.loginReducer)
    const [clickCreate, setClickCreate] = useState(false)
    const [clickUpdate, setClickUpdate] = useState(false)
    const [updateUser, setUpdateUser] = useState({})
    const [click, setClick] = useState(false)
    const dispatch = useDispatch()
   
    const handlerView = ()=>{
        setClick(c => c = !c)
    }

    const handlerCreateModal = ()=>{
        setClickCreate(c => c = !c)
    }
    const handlerupdateUs = (info)=>{
        setUpdateUser(us => us = info)
        setClickUpdate(u => u = !u)
    }

    const handlerClicUpdate = ()=>{
        setClickUpdate(u => u = !u)
        dispatch(clearCreateProperty())
    }
    

    return(
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-[90%] border-t-2 border-b-2 flex flex-col items-center justify-center">
                <div>
                    <p className="font-bold text-2xl">Lista de Propiedades</p>
                </div>
                <button onClick={()=>handlerView()} className="my-4 w-[25%] p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-xl">
                    {click ? "Ocultar lista": "Ver lista"}
                </button>
                {click && !user.name ? <p className="my-9 font-semibold text-xl">Debe de logearse para ver los usuarios</p> : ""}
                {click && user.name ? <TableProperty handlerCreateModal={handlerCreateModal} handlerupdateUs={handlerupdateUs}/> : ""}
                {clickCreate ? <CreateUser handlerCreateModal={handlerCreateModal}/>:""}
                {clickUpdate ? <EditProp handlerClicUpdate={handlerClicUpdate} data={updateUser}></EditProp> : ""}
            </div>

        </div>
    )
}

export {Property}