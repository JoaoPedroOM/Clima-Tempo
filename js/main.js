import { config } from "./config.js";

const btnSearch = document.getElementById("buttonSearch")
const inputLocal = document.getElementById("search")

const myKey = config.key;

const api = {
 base: "https://api.openweathermap.org/data/2.5/",
}

btnSearch.addEventListener("click", () =>{
  buscarLocal(inputLocal.value)
})

inputLocal.addEventListener("keypress", (event) => {
  const key = event.key;

  if (key === "Enter") {
    buscarLocal(inputLocal.value);
  }
});

function buscarLocal(local) {
  fetch(`${api.base}weather?q=${local}&lang=pt_br&units=metric&appid=${myKey}`)
  .then(resposta => resposta.json())
  .then(json => {
    exibeResposta(json)
  })
}

function exibeResposta(dados) {
  
  const tempMedia = Math.round(dados.main.temp);
  const tempMinima = Math.round(dados.main.temp_min);
  const tempMaxima = Math.round(dados.main.temp_max);
  const ventos = Math.round(dados.wind.speed) * (18/5);
  const umidade = dados.main.humidity;
  const minhaData = DataAtual();
  const icon = dados.weather[0].icon;

  const city = document.querySelector(".local");
  city.innerText = `${dados.name}, ${minhaData}`

  const iconImg = document.getElementById("icon-img");
  
  if (iconImg) {
    iconImg.src = `./img/${icon}.png`;
  } else {
    console.error("Elemento com ID 'icon-img' não encontrado.");
  }
  
  const descricao = document.querySelector(".description");
  descricao.innerText = `${dados.weather[0].description}`

  const media = document.getElementById("media");
  media.innerText = `${tempMedia}°C`

    const body = document.querySelector('body');
    if (tempMedia <= 18) {
      body.style.background = 'var(--color-chuvoso)';
      city.style.color = 'var(--fc-chuvoso)'
    } else if (tempMedia <= 25) {
      body.style.background = 'var(--color-nublado)';
      city.style.color = 'var(--fc-nublado)'

    } else {
      body.style.background = 'var(--color-sol)';
      city.style.color = 'var(--fc-sol)'
    }

  const minTemp = document.querySelector(".tempMinima");
  const maxTemp = document.querySelector(".tempMaxima");

  minTemp.innerHTML = `&darr; ${tempMinima}°`;
  maxTemp.innerHTML = `&uarr; ${tempMaxima}°`;

  const speedVento = document.querySelector(".ventos")
  speedVento.innerText = `Ventos a ${ventos} km/h`

  const umidadeCity = document.querySelector(".umidade");
  umidadeCity.innerText = `Umidade do ar ${umidade}%`

}

function DataAtual() {
  const date = new Date()

  var options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const DataAtual = date.toLocaleDateString("pt-BR", options)
  const exibiData = DataAtual.charAt(0).toUpperCase() + DataAtual.substring(1);

  return exibiData
}

