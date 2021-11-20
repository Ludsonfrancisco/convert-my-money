const convert = require('./converter')


test("convert cotacao 4 e quantidade 4", () => {
  expect(convert.convert(4, 4)).toBe(16)
})

test('converter int para float', () => {
  expect(convert.toMoney(2)).toBe("2.00")
})

test('convert string para float', () => {
  expect(convert.toMoney("2")).toBe("2.00")
})