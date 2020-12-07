import React from "react"
import Firebase from "../firebase/index"
import app from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { FirebaseAuthContextProvider } from "../authentication/context"
import { MuiThemeProvider } from "@material-ui/core"
import { theme } from "../theme"

export const FirebaseGlobalContext = React.createContext(null)

const FirebaseGlobalContextProvider = props => {
  return (
    <FirebaseGlobalContext.Provider value={new Firebase(app)}>
      {props.children}
    </FirebaseGlobalContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => {
  return (
    <FirebaseGlobalContextProvider>
      <FirebaseAuthContextProvider>
        <MuiThemeProvider theme={theme}>{element}</MuiThemeProvider>
      </FirebaseAuthContextProvider>
    </FirebaseGlobalContextProvider>
  )
}