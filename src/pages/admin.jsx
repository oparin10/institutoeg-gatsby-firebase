import React from "react"
import { Router } from "@reach/router"
import { navigate } from "gatsby"
import Login from "../components/AdminComponents/Login"
import Dashboard from "../components/AdminComponents/Dashboard"
import Students from "../components/AdminComponents/Students"
import Courses from "../components/AdminComponents/Courses"
import Sales from "../components/AdminComponents/Salesmen"
import Messages from "../components/AdminComponents/Messages"
import PrivateRoute from "../components/AdminComponents/PrivateRoute"
import { FirebaseContext } from "../context/firebase"

function Admin(props) {
  const [auth, setAuth] = React.useState(false)

  const firebase = React.useContext(FirebaseContext)

  React.useEffect(() => {
    setAuth(firebase.isAuth)

    if (location.pathname == "/admin/" || location.pathname == "/admin") {
      navigate("/admin/login")
    }
  })

  return (
    <Router>
      <PrivateRoute
        isAuth={auth}
        component={Login}
        path={"/admin/login"}
      ></PrivateRoute>

      <PrivateRoute
        isAuth={auth}
        component={Dashboard}
        path={"/admin/dashboard"}
      ></PrivateRoute>

      <PrivateRoute
        isAuth={auth}
        component={Students}
        path={"/admin/alunos"}
      ></PrivateRoute>

      <PrivateRoute
        isAuth={auth}
        component={Courses}
        path={"/admin/cursos"}
      ></PrivateRoute>

      <PrivateRoute
        isAuth={auth}
        component={Sales}
        path={"/admin/vendas"}
      ></PrivateRoute>

      <PrivateRoute
        isAuth={auth}
        component={Messages}
        path={"/admin/mensagens"}
      ></PrivateRoute>
    </Router>
  )
}

export default Admin
