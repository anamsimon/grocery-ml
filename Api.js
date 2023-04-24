export default function predict(image)  {
  alert('');
  const serverurl = "https://735b-2001-56a-f93f-7100-81ca-9ede-36fd-bb47.ngrok-free.app/predict";

  var data = new FormData();
  data.append('file', {
    uri: image, // your file path string
    name: 'my_photo.jpg',
    type: 'image/jpg'
  });

   fetch(serverurl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    })
    .then((response) => response.text())
    .then((body) => {
      alert(body);
    })
     .catch((err) => {
      alert(`${err}`);
    })
    .finally(() => {
      return;
    });
  // fetch('https://us-central1-e-receipt-f8d0d.cloudfunctions.net/helloWorld', {
  //   method: 'GET',
  // })
  //   .then((response) => response.text())
  //   .then((body) => {
  //     alert(body);
  //   })
  //   .catch((err) => {
  //     alert(`${err}`);
  //   })
  //   .finally(() => {
  //     return;
  //   });
}