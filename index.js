const express = require("express");
const req = require("express/lib/request");
const axios = require("axios");
const cheerio = require("cheerio");



//Inicializo Servidor
const app = express();
//Defino Puerto
const port = 8500;


app.get('/', (req, res) => {
    res.send('Bienvenido al Scraper Web');
})

app.listen(port, () => {
    console.log(`Web Scrapper escuchando en el PORT:${port}`);
})


//Defino la URL para hacer el scrapping

const URL = "http://www.clarin.com.ar";

// Llamo a la Pagina y recompilo información
axios(URL)
    .then(function (response) {
        // handle success
        const html = response.data;
        const $ = cheerio.load(html);
        const noticias = [];

        const masvista = $('.The__most__seen').html();
        let items = masvista.split('\n');

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (element.includes('h2')) {
                noticias.push(element.replace(/(<([^>]+)>)/ig,""));
//                noticias.push(element);
            }
        }
        console.log(noticias);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });



