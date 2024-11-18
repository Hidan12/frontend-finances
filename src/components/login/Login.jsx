import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, logOut } from "../../store/actions/actionLoginr"
import { clearUsers } from "../../store/actions/actionUsersAll"


const ModalsignIn = ({handlerClick})=>{
    const [mail, setMial] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handlerMail = (e)=>{
        setMial(m => m = e.target.value )
    }
    const handlerPassword = (e)=>{
        setPassword(p => p = e.target.value)
    }
    const handlerSumit = (e)=>{
        e.preventDefault()
        dispatch(loginUser({mail: mail, password:password}))
        handlerClick()
    }
    return(
        <div className="absolute w-full h-full flex justify-center">
            <div className="relative top-16 flex flex-col justify-between w-[35vw] h-[35vh] rounded-2xl bg-slate-300">
                <div className="w-full grid grid-cols-2 justify-items-end">
                    <p className="text-black font-bold text-xl">Login</p>
                    <button onClick={()=> handlerClick()} className="me-4 font-bold text-xl text-red-500 hover:text-red-600">x</button>
                </div>
                <div className="w-full flex justify-center">
                    <input className="w-[80%]" type="email" onChange={(e)=> handlerMail(e)} />
                </div>
                <div className="w-full flex justify-center">
                    <input className="w-[80%]" type="password" onChange={(e)=> handlerPassword(e)} />
                </div>
                <div className="w-full flex justify-center my-5">
                    <button onClick={(e)=> handlerSumit(e)} className="p-2 rounded-xl bg-blue-600 hover:bg-blue-800">LOGIN</button>
                </div>
            </div>
        </div>
    )
}

const ModalSignOut = ({handlerClick}) =>{
    const {user, token} = useSelector(state=> state.loginReducer)
    const dispatch = useDispatch()
    const handlerBotton = (token)=>{
        dispatch(logOut({user: user.mail, token:token}))
        dispatch(clearUsers())
        handlerClick()
    }
    return (
        <div className="absolute w-full h-full flex justify-center">
            <div className="relative top-16 flex flex-col justify-between items-center w-[35vw] h-[35vh] rounded-2xl bg-slate-300">
                <p className="text-black font-bold">Seguro que desea desconectarse {user.name}?</p>
                <button onClick={()=>handlerBotton(token)} className="p-2 bg-red-500 hover:bg-red-700">LOG OUT</button>
            </div>
        </div>
    )
} 

const ModalLogin = ({handlerClick})=>{
    const {user} = useSelector(state => state.loginReducer)
    return(
        <div>
            {user.name ? <ModalSignOut handlerClick={handlerClick}/> : <ModalsignIn handlerClick={handlerClick}/>}
        </div>
    )
}

export  {ModalLogin}