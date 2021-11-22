const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = data => axios.get(getUrl('11-01-2021'))
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getCotacao = async () => {
  const res = await getCotacaoAPI('')
  const cotacao = extractCotacao(res)
  return cotacao
}

module.exports = {
  getCotacaoAPI,
  extractCotacao,
  getCotacao
}