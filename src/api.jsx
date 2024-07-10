export async function gatherAPIData() {
  const TFD_KEY = import.meta.env.VITE_TFD_API_KEY
  fetchBasicAPIData(TFD_KEY);
}

async function fetchBasicAPIData(api_key) {
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