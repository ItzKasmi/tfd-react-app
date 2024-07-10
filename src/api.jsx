export async function gatherAPIData() {
  const TFD_KEY = import.meta.env.VITE_TFD_API_KEY;
  const OUID = "8102e8f67c7128b13587299ded26367ba42bb9591fc1dcdf29fba0635144751d";
  const NICKNAME = "NitoTech%230254";
  
  const basicAPIData = fetchBasicAPIData(TFD_KEY, OUID);
  const descendantAPIData = fetchDescendantAPIData(TFD_KEY, OUID);
  const weaponAPIData = fetchWeaponAPIData(TFD_KEY, OUID);
  const reactorAPIData = fetchReactorAPIData(TFD_KEY, OUID);
  const componentAPIData = fetchComponentAPIData(TFD_KEY, OUID);

  return basicAPIData, descendantAPIData, weaponAPIData, reactorAPIData, componentAPIData;
}


`
Used Basic API Data:
  - "user_name"
  - "platform_type"
  - "mastery_rank_level"
  Maybe get titles not sure yet
`
async function fetchBasicAPIData(api_key, OUID) {
  const url = `https://open.api.nexon.com/tfd/v1/user/basic?ouid=${OUID}`
  try {
    const res = await fetch(url, {
      headers: {
        "x-nxopen-api-key": api_key
      }
    })
    const apiData = await res.json();
    console.log(apiData);
  } catch (err) {
    console.log(err.message);
  }
}


`
Used Descendant API Data:
  - "descendant_id"
  - "descendant_level"
  If I show off individual modules will use:
    - "module_max_capacity"
    - "module_capacity"
    - "module"
`
async function fetchDescendantAPIData(api_key, OUID) {
  const url = `https://open.api.nexon.com/tfd/v1/user/descendant?ouid=${OUID}`
  try {
    const res = await fetch(url, {
      headers: {
        "x-nxopen-api-key": api_key
      }
    })
    const apiData = await res.json();
    console.log(apiData);
  } catch (err) {
    console.log(err.message);
  }
}


`
Used Weapon API Data:
  - "weapon"
    - "weapon_id"
    - "weapon_level"

  Will need to find a way to pull from downloaded metadata JSON based on weapon_id
  for image urls.
`
async function fetchWeaponAPIData(api_key, OUID) {
  const url = `https://open.api.nexon.com/tfd/v1/user/weapon?language_code=en&?ouid=${OUID}`
  try {
    const res = await fetch(url, {
      headers: {
        "x-nxopen-api-key": api_key
      }
    })
    const apiData = await res.json();
    console.log(apiData);
  } catch (err) {
    console.log(err.message);
  }
}


`
Used Reactor API Data:
  - "reactor_id"
  - "reactor_level"
`
async function fetchReactorAPIData(api_key, OUID) {
  const url = `https://open.api.nexon.com/tfd/v1/user/reactor?language_code=en&?ouid=${OUID}`
  try {
    const res = await fetch(url, {
      headers: {
        "x-nxopen-api-key": api_key
      }
    })
    const apiData = await res.json();
    console.log(apiData);
  } catch (err) {
    console.log(err.message);
  }
}


`
Used Component API Data:
  - "external_component"
    - "external_component_id"
    - "external_component_level"
    - "external_component_additional_stat"
      - "additional_stat_name"
      - "additional_stat_value"
`
async function fetchComponentAPIData(api_key, OUID) {
  const url = `https://open.api.nexon.com/tfd/v1/user/external-component?language_code=en&?ouid=${OUID}`
  try {
    const res = await fetch(url, {
      headers: {
        "x-nxopen-api-key": api_key
      }
    })
    const apiData = await res.json();
    console.log(apiData);
  } catch (err) {
    console.log(err.message);
  }
}