import { useEffect, useState } from "react"
import { gatherAPIData } from "./api"
import Basic from "./components/Basic"
import Descendant from "./components/Descendant"
import StatComponent from "./components/StatComponent"
import Weapon from "./components/Weapon"

`
To save from using up to 7 api uses per search, consider limiting searches based off time since last search.
This will work towards making sure you don't go over the 1000 daily use limit.
`

function App() {
  const [showModal, setShowModal] = useState(false)
  const [basicData, setBasicData] = useState(null);
  const [descendantData, setDescendantData] = useState(null);
  const [weaponData, setWeaponData] = useState(null);
  const [reactorData, setReactorData] = useState(null);
  const [componentData, setComponentData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  async function fetchData() {
    setLoading(true);
    try {
      const  [basicAPIData, descendantAPIData, weaponAPIData, reactorAPIData, componentAPIData] = await gatherAPIData();

      setBasicData(basicAPIData);
      setDescendantData(descendantAPIData);
      setWeaponData(weaponAPIData);
      setReactorData(reactorAPIData);
      setComponentData(componentAPIData);
    } catch (error) {
      console.error("Error fetching, API data", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="root-container">
        <button onClick={fetchData}>Fetch Data</button>
        {loading && <p>Loading...</p>}
        <div className="name-banner">
          {!loading && descendantData && <Descendant descendantData={descendantData} />}
          {!loading && basicData && <Basic basicData={basicData} />}
        </div>
        <div className="weapon-modal">
          <button onClick={handleToggleModal}>Weapons List</button>
          {showModal && !loading && weaponData && <Weapon weaponData={weaponData} handleToggleModal={handleToggleModal}/>}
        </div>
        {!loading && reactorData && componentData && (
          <StatComponent reactorData={reactorData} componentData={componentData} />
        )}
      </div>
    </>
  )
}

export default App
