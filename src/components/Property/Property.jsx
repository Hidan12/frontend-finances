import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setProperties } from "../../store/actions/actionProperty.js"



const RowTable = ({Property})=>{
    return(
        <div className=" w-full grid grid-cols-5">
                <div className="flex items-center justify-center border-x h-[9vh] "><p className="font-bold text-black">{Property.name}</p></div>
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
            <input type="text" onChange={(e)=> dispatch(setProperties(e.target.value))} className="w-[25%] p-2 rounded-xl border border-solid border-blue-500" placeholder="Buscar por nombre" />
            <button onClick={()=>handlerCreateModal()} className="bg-blue-500 hover:bg-blue-800 p-2 rounded-xl text-white">Crear Propiedad</button>
        </div>
    )
}
const TableProperty = ({handlerCreateModal})=>{
    const{properties, loading, error}= useSelector(state => state.PropertyReducer)
    console.log(properties);
    
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
                <div className=" w-full grid grid-cols-5">
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">nombre</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">tipo</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">precio</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">usuario</p></div>
                </div>
                {!loading && properties ? properties.map(property => <RowTable key={property._id} Property={property}/>) : "" }
                {loading ? <p>cargando informacion</p>: ""}
            </div>
        </div>
        
        
    )

}

const CreateUser = ({handlerCreateModal})=>{
    const {token} = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [Contrasenia, setContrasenia] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState(0)
    const handlerNombre = (e)=>{
        setNombre(n => n = e)
    }
    const handlerTipo = (e)=>{
        setEmail(m => m = e)
    }
    const handlerPrecio = (e)=>{
        setContrasenia(c => c = e)
    }
    const handlerUser = (e)=>{
        setDireccion(d => d = e)
    }
    
    const handlerCreate = (e, token)=>{
        e.preventDefault()
        dispatch(createUser({nombre:nombre, email:email, contrasenia: Contrasenia, direccion:direccion, telefono:telefono, token:token}))
        handlerCreateModal()
    }

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
                    <input type="tel" className="w-full my-4" placeholder="User" onChange={(e)=> handlerUser(e.target.value)} required/>
                </div>
               
                <button onClick={(e)=> handlerCreate(e, token)} className="p-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white">Crear usuario</button>
            </div>

        </div>
    )
}

const Property = ()=>{
    const {user} = useSelector(state => state.loginReducer)
    const [clickCreate, setClickCreate] = useState(false)
    const [click, setClick] = useState(false)
   
    const handlerView = ()=>{
        setClick(c => c = !c)
    }

    const handlerCreateModal = ()=>{
        setClickCreate(c => c = !c)
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
                {click && user.name ? <TableProperty handlerCreateModal={handlerCreateModal}/> : ""}
                {clickCreate ? <CreateUser handlerCreateModal={handlerCreateModal}/>:""}
            </div>

        </div>
    )
}

export {Property}