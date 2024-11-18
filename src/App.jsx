import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, userLocal } from './store/actions/actionLoginr.js'
import { Header } from './components/header/Header.jsx'
import { ModalLogin } from './components/login/Login.jsx'
import { Users } from './components/user/Users.jsx'
import { Property } from './components/Property/Property.jsx'
import CreateUser from './components/user/createUser.jsx'
import { Finance } from './components/finance/finance.jsx'





function App() {
  const [clickLogin, setClickLogin] = useState(false)
  const [clickCreateUser, setClickCreateUser] = useState(false)
  const {token, error, user} = useSelector(state => state.loginReducer)
  const {finances, loading} = useSelector(state => state.financeReducer)

  const dispatch = useDispatch()


  useEffect(()=>{
    const localUser = localStorage.getItem('dataUser')
    if (localUser !== null) {
      try {
        const dataUser = JSON.parse(localUser);
        dispatch(userLocal(dataUser));
      } catch (error) {
        console.error(error);
      }}
  },[])
    
  
  
  const handlerClick = ()=>{
    setClickLogin(l => l = !l)
  }
  const handlerClickCreateUser = ()=>{
    setClickCreateUser(l => l = !l)
  }
 
  return (
    <>
      <Header handlerBotton={handlerClick} handlerClickCreateUser={handlerClickCreateUser}/>
      {clickLogin ? <ModalLogin handlerClick={handlerClick}></ModalLogin> : ""}
      {clickCreateUser ? <CreateUser handlerClickCreateUser={handlerClickCreateUser}></CreateUser> : ""}
      <Users></Users>
      <Property></Property>
      <Finance></Finance>
    </>
  )
}

export default App
