import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser, usersSet } from '../../store/actions/actionUsersAll';
import { createAndLogin, userLocal } from '../../store/actions/actionLoginr';

const CreateUser = ({ handlerClickCreateUser }) => {
    const {token, user, loading, error} = useSelector(state => state.loginReducer)
    const {} = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [Contrasenia, setContrasenia] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState(0)
    const handlerNombre = (e)=>{
        setNombre(n => n = e)
    }
    const handlerEmail = (e)=>{
        setEmail(m => m = e)
    }
    const handlercontrasenia = (e)=>{
        setContrasenia(c => c = e)
    }
    const handlerDireccion = (e)=>{
        setDireccion(d => d = e)
    }
    const handlerTelefono = (e)=>{
        setTelefono(t => t = e)
    }
    const handlerCreate = (e, token)=>{
        e.preventDefault()
        dispatch(createAndLogin({nombre:nombre, email:email, contrasenia: Contrasenia, direccion:direccion, telefono:telefono, token:token}))
    }
    
    
    useEffect(()=>{
        if (user  && !loading && !error) {
            handlerClickCreateUser()
           
        }
    },[user, loading])


    return(
        <div className="absolute top-32 w-full flex justify-center">
            <div className="sticky w-[40%] flex flex-col justify-center items-center rounded-xl top-0 bg-slate-400">
                <div className="w-full grid grid-cols-2 justify-items-end">
                    <p className="font-bold text-xl">Crear usuarios</p>
                    <button onClick={()=> handlerClickCreateUser()} className=" me-5 font-bold text-2xl text-red-600 hover:text-red-700" >X</button>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" onChange={(e)=> handlerNombre(e.target.value)} placeholder="Nombre" required />
                </div>
                <div className="w-[60%]">
                    <input type="email" className="w-full my-4" onChange={(e)=> handlerEmail(e.target.value)} placeholder="Email" required/>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" onChange={(e)=> handlercontrasenia(e.target.value)} placeholder="Contraseña" required/>
                </div>
                <div className="w-[60%]">
                    <input type="number" className="w-full my-4" placeholder="Telefono" onChange={(e)=> handlerTelefono(e.target.value)} required/>
                </div>
                <div className="w-[60%]">
                    <input type="text" className="w-full my-4" placeholder="Direccion" onChange={(e)=> handlerDireccion(e.target.value)} required/>
                </div>
                {error ? <p className="text-red-500 text-center font-semibold">Error al crear usuario</p>:""}
                <button onClick={(e)=> handlerCreate(e, token)} className="p-2 rounded-xl bg-blue-500 hover:bg-blue-700 text-white">Crear usuario</button>
            </div>

        </div>
    )
};

export default CreateUser;
