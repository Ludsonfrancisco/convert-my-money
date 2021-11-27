const api = require('./api.bcb')
const axios = require('axios')


jest.mock('axios')

test('getCotacaoAPI', () => {
  const res = {
    data: {
      value: [
        { cotacaoVenda: '5,68' }
      ]
    }
  }

  axios.get.mockResolvedValue(res)
  api.getCotacaoAPI('11-25-2021').then(resp => {
    expect(resp).toEqual(res)
    console.log(axios.get.mock)
  })
})