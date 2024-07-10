import { useEffect, useState } from "react"
import { gatherAPIData } from "./api"
import Basic from "./components/Basic"
import Descendant from "./components/Descendant"
import StatComponent from "./components/StatComponent"
import Weapon from "./components/Weapon"

const NICKNAME = "NitoTech%230254";
const OUID = "8102e8f67c7128b13587299ded26367ba42bb9591fc1dcdf29fba0635144751d";



// fetchAPIData();

function App() {
  return (
    <>
      <Basic />
      <Descendant />
      <Weapon />
      <StatComponent />
    </>
  )
}

export default App
