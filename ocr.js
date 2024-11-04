function toBase64(file) {

 return new Promise((resolve, reject) => {

   const reader = new FileReader();

   reader.readAsDataURL(file);

   reader.onload = () => resolve(reader.result);

   reader.onerror = error => reject(error);

 });

}

function OCR(image) {

// Define the URL and data

const url = 'https://api.ocr.space/parse/image’;

const data = {

  apikey: ‘K84105813588957’

  base64Image: toBase64(image)

};

// Define the options

const options = {

  method: 'POST',

  headers: {

    'Content-Type': 'application/json'

  },

  body: JSON.stringify(data)

};


// Send the request

fetch(url, options)

  .then(response => response.json())

  .then(data => return data)

  .catch(error => return {error:true});

}
