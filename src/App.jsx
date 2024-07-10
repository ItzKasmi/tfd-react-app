import { useEffect, useState } from "react"
import { gatherAPIData } from "./api"
import Basic from "./components/Basic"
import Descendant from "./components/Descendant"
import StatComponent from "./components/StatComponent"
import Weapon from "./components/Weapon"

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
