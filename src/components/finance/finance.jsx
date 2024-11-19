import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCreateFinance, createFinance, deleteFinance, financeSet, searchFinance, updateFinance } from "../../store/actions/actionFinances"

const RowTable = ({finance, handlerupdateUs, handlerIdDelete})=>{
    return(
        <div className=" w-full grid grid-cols-5">
                <div className="flex flex-col items-center justify-center border-x h-[9vh] ">
                    <p className="font-bold text-black">{finance.user ? finance.user.name : "usuario borrado"}</p>
                    <div className="flex items-center justify-center gap-5  h-[9vh]">
                        <button className="text-red-500 hover:text-red-700" onClick={()=> handlerIdDelete(finance)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </button>
                        <button onClick={()=>handlerupdateUs(finance)} className="text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-center border-x h-[9vh]"><p className="font-bold text-black">{finance.description}</p></div>
                <div className="flex items-center justify-center border-x h-[9vh]"><p className="font-semibold text-black">{finance.date}</p></div>
                <div className="flex items-center justify-center border-x h-[9vh]"><p className="font-bold text-black">{finance.value}</p></div>
                <div className="flex items-center justify-center border-x h-[9vh]"><p className="font-bold text-black">{finance.active ? "Ganancia": "Gastado"}</p></div>
            </div>
    )
}

const SearchFinance = ({handlerCreateModal})=>{
    const dispatch = useDispatch()

    return(
        <div className="w-full flex justify-center items-center gap-3 my-5">
            <input type="text" onChange={(e)=> dispatch(searchFinance(e.target.value))} className="w-[25%] p-2 rounded-xl border border-solid border-blue-500" placeholder="Buscar por descripcion" />
            <button onClick={()=>handlerCreateModal()} className="bg-blue-500 hover:bg-blue-800 p-2 rounded-xl text-white">Crear finanza</button>
        </div>
    )
}
const TableFinance = ({handlerCreateModal, handlerupdateUs})=>{
    const {token, user} = useSelector(state => state.loginReducer)
    const{finances, loading, error, deleteFin, deleteLoadin, searchFin}= useSelector(state => state.financeReducer)
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
        if (!deleteLoadin && idDelete._id && deleteFin) {
            console.log("entro al 1 if");
            setIdDelete(i => i = {})
            dispatch(financeSet({token: token, search:searchFin}))
            setClickDelete(c => c = !c)
            }
            console.log("entro al useee");
            
        if (idDelete._id && !deleteFin ) {
            console.log("entro al 2 if");
            dispatch(deleteFinance({finance: {_id: idDelete}, token:token }))
            
            console.log("saliendo de if");
        
        }
    
    },[clickDelete, deleteLoadin])
    if (error.error) {
        return(
            <div>
                <p>error al cargar la informacion</p>
            </div>
        )
    }
    return(
        <div className="w-full">
            <SearchFinance handlerCreateModal={handlerCreateModal}/>
            <div className="w-full">
                <div className=" w-full grid grid-cols-5">
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">Usuario</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">Descripcion</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">Fecha</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">Valor</p></div>
                    <div className="flex items-center justify-center border-x bg-slate-300"><p className="font-bold text-black">Activo</p></div>
                </div>
                {loading ? <p>cargando informacion</p>: ""}
                {!loading && finances.length > 0 ? finances.map(finance => <RowTable key={finance._id} handlerIdDelete={handlerIdDelete} handlerupdateUs={handlerupdateUs} finance={finance}/>) : <p className="text-center font-bold text-2xl text-black mt-[5vh]">No hay datos disponible</p> }
            </div>
        </div>
        
        
    )

}

const EditFinance = ({handlerClicUpdate, data})=>{
    const {token} = useSelector(state => state.loginReducer)
    const {users} = useSelector(state => state.usersReducer)
    const {updateFin, updateError, updateLoadin, searchFin} = useSelector(state => state.financeReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [descripcion, setDescripcion] = useState(data.description)
    const [usuario, setUsuario] = useState(data.user._id)
    const [fecha, setFecha] = useState(data.date)
    const [monto, setMonto] = useState(data.value)

    console.log(data.user._id, data.date);
    
    const handlerDescription = (e)=>{
        setDescripcion(n => n = e)
    }
    const handlerUsuario = (e)=>{
        setUsuario(m => m = e)
    }
    const handlerFecha = (e)=>{
        setFecha(c => c = e)
    }
    const handlerMonto = (e)=>{
        setMonto(d => d = e)
    }
    const handlerCreate = (e, token, data)=>{
        e.preventDefault()
        dispatch(updateFinance({descripcion:descripcion, fecha:fecha, valor: monto, user: usuario, id: data._id , token:token}))
    }

    useEffect(()=>{
        if (updateFin) {
            dispatch(financeSet({token: token, search: searchFin}))
            handlerClicUpdate()
        }else if(!updateLoadin && updateError){
            setError(e => e = !e)
        }
    },[updateFin, updateError])

    return(
        <div className="absolute top-32 w-full flex justify-center">
            <div className="sticky w-[40%] flex flex-col justify-center items-center rounded-xl top-0 bg-slate-400">
                <div className="w-full grid grid-cols-2 justify-items-end">
                    <p className="font-bold text-xl">Editar finanza</p>
                    <button onClick={()=> handlerClicUpdate()} className=" me-5 font-bold text-2xl text-red-600 hover:text-red-700" >X</button>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" value={descripcion} onChange={(e)=> handlerDescription(e.target.value)} placeholder="Descripcion" required />
                </div>
                <div className="w-[60%]">
                    <input type="number" className="w-full my-4" value={monto} onChange={(e)=> handlerMonto(e.target.value)} placeholder="Valor" required/>
                </div>
                <div className="w-[60%]">
                    <input type="date" className="w-full my-4" value={fecha} onChange={(e)=> handlerFecha(e.target.value)} required/>
                </div>
                <div className="w-[60%]">
                    <select className="w-full my-4" value={usuario}  onChange={(e)=>handlerUsuario(e.target.value)}>
                        <option value="">Seleccione un usuario</option>
                        {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                    </select>
                </div>
                {error ? <p className="text-red-500 text-center font-semibold">Error al editar</p>:""}
                <button onClick={(e)=> handlerCreate(e, token, data)} className="my-3 p-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white">Editar finanza</button>
            </div>

        </div>
    )
}

const CreateFinance = ({handlerCreateModal})=>{
    const {token} = useSelector(state => state.loginReducer)
    const {users} = useSelector(state => state.usersReducer)
    const {createFin, createError, createLoding, searchFin} = useSelector(state => state.financeReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [descripcion, setDescripcion] = useState("")
    const [usuario, setUsuario] = useState("")
    const [fecha, setFecha] = useState("")
    const [monto, setMonto] = useState(0)

    const handlerDescription = (e)=>{
        setDescripcion(n => n = e)
    }
    const handlerUsuario = (e)=>{
        setUsuario(m => m = e)
    }
    const handlerFecha = (e)=>{
        setFecha(c => c = e)
    }
    const handlerMonto = (e)=>{
        setMonto(d => d = e)
    }
    const handlerCreate = (e, token)=>{
        e.preventDefault()
        dispatch(createFinance({descripcion:descripcion, fecha:fecha, valor: monto, user: usuario, token:token}))
    }

    useEffect(()=>{
        if (createFin) {
            dispatch(financeSet({token: token, search: searchFin}))
            handlerCreateModal()
        }else if(!createLoding && createError){
            setError(e => e = !e)
        }
    },[createFin, createError])

    return(
        <div className="absolute top-32 w-full flex justify-center">
            <div className="sticky w-[40%] flex flex-col justify-center items-center rounded-xl top-0 bg-slate-400">
                <div className="w-full grid grid-cols-2 justify-items-end">
                    <p className="font-bold text-xl">Crear finanza</p>
                    <button onClick={()=> handlerCreateModal()} className=" me-5 font-bold text-2xl text-red-600 hover:text-red-700" >X</button>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" onChange={(e)=> handlerDescription(e.target.value)} placeholder="Descripcion" required />
                </div>
                <div className="w-[60%]">
                    <input type="number" className="w-full my-4" onChange={(e)=> handlerMonto(e.target.value)} placeholder="Valor" required/>
                </div>
                <div className="w-[60%]">
                    <input type="date" className="w-full my-4" onChange={(e)=> handlerFecha(e.target.value)} required/>
                </div>
                <div className="w-[60%]">
                    <select className="w-full my-4" onChange={(e)=>handlerUsuario(e.target.value)}>
                        <option value="">Seleccione un usuario</option>
                        {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                    </select>
                </div>
                {error ? <p className="text-red-500 text-center font-semibold">Error al crear finanza</p>:""}
                <button onClick={(e)=> handlerCreate(e, token)} className="p-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white">Crear finanza</button>
            </div>

        </div>
    )
}

const Finance = ()=>{
    const {user} = useSelector(state => state.loginReducer)
    const [clickCreate, setClickCreate] = useState(false)
    const [clickUpdate, setClickUpdate] = useState(false)
    const [updateUser, setUpdateUser] = useState({})
    const [click, setClick] = useState(false)
    const dispatch = useDispatch()
    const handlerView = ()=>{
        setClick(c => c = !c)
    }

    const handlerupdateUs = (info)=>{
        setUpdateUser(us => us = info)
        setClickUpdate(u => u = !u)
    }
    const handlerCreateModal = ()=>{
        dispatch(clearCreateFinance())
        setClickCreate(c => c = !c)
    }
    const handlerClicUpdate = ()=>{
        setClickUpdate(u => u = !u)
        dispatch(clearCreateFinance())
    }
    return(
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-[90%] border-t-2 border-b-2 flex flex-col items-center justify-center">
                <div>
                    <p className="font-bold text-2xl">Libro de finanza</p>
                </div>
                <button onClick={()=>handlerView()} className="my-4 w-[25%] p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-xl">
                    {click ? "Ocultar lista": "Ver lista"}
                </button>
                {click && !user.name ? <p className="my-9 font-semibold text-xl">Debe de logearse para ver los usuarios</p> : ""}
                {click && user.name ? <TableFinance handlerupdateUs={handlerupdateUs} handlerCreateModal={handlerCreateModal}/> : ""}
                {clickCreate ? <CreateFinance handlerCreateModal={handlerCreateModal}/>:""}
                {clickUpdate ? <EditFinance handlerClicUpdate={handlerClicUpdate} data={updateUser} /> : ""}
            </div>

        </div>
    )
}

export {Finance}