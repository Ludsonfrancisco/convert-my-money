process.env.TZ = 'America/Sao_Paulo'
const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda

const getToday = () => {
  const today = new Date()

  if (today.getDay() === 0) {
    return `${today.getMonth() + 1}-${today.getDate() - 2}-${today.getFullYear()}`
  } else if (today.getDay() === 6) {
    return `${today.getMonth() + 1}-${today.getDate() - 1}-${today.getFullYear()}`
  } else {
    return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
  }
}


const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
  try {

    const today = getToday()
    console.log(today)
    const url = getUrl(today)
    const res = await getCotacaoAPI(url)
    const cotacao = extractCotacao(res)
    return cotacao
  } catch (error) {
    return ''
  }
}

module.exports = {
  getCotacaoAPI,
  getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
  extractCotacao,
  getUrl,
  getToday,
  pure: {
    getCotacao
  }
}