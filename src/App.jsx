import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { setFinances } from './store/actions/actionFinances.js'
import { loginUser } from './store/actions/actionLoginr.js'
import { Header } from './components/header/Header.jsx'
import { ModalLogin } from './components/login/Login.jsx'
import { Users } from './components/user/Users.jsx'

function App() {
  const [clickLogin, setClickLogin] = useState(false)
  const {token, error, user} = useSelector(state => state.loginReducer)
  const {finances, loading} = useSelector(state => state.financeReducer)

  const handlerClick = ()=>{
    setClickLogin(l => l = !l)
  }
 
  return (
    <>
      <Header handlerBotton={handlerClick}/>
      {clickLogin ? <ModalLogin handlerClick={handlerClick}></ModalLogin> : ""}
      <Users></Users>
    </>
  )
}

export default App