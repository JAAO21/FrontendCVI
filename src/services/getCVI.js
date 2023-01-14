
const GetCVI = async ({ atribute, data, typeFile }) => {
  //let token = localStorage.getItem('token')
  const url = `http://localhost:3500/${atribute}`;

  if (typeFile && data) {
    console.log("DATA", data)
    const formData = new FormData();
    formData.append("file", data);
    formData.append("title", "Nepe");

    console.log("FROM", formData)
    return await fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(data => data.json())
  } else if (data) {
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