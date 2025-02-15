
const GetCVI = async ({ atribute, data, typeFile }) => {
  //let token = localStorage.getItem('token')
  const url = `https://cvi.up.railway.app/${atribute}`;

  if (typeFile && data) {
    console.log("DATA", data)
    const formData = new FormData();
    formData.append("file", data);

    console.log("FROM", formData)
    return await fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(data => data.json())
  } else if (data) {
    console.log(data)
    console.log(url)
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
  } else {
    return await fetch(url)
      .then(res => res.json())
      .then(response => {
        const data = response;
        return data
      })
  }
}

export default GetCVI;