const { addition, soustraction, multiplication, division } = require("../../functions/mathUtils")

describe('Tests unitaires pour la méthode addition()', () => {

  test('Je peux additionner deux chiffres positifs', () => {
    expect(addition(4, 6)).toBe(10)
  })

  test('Je peux additionner deux chiffres négatifs', () => {
    expect(addition(-4, -6)).toBe(-10)
  })

  test('Je peux additionner un positif et un négatif', () => {
    expect(addition(-4, 10)).toBe(6)
  })

  test('Je peux additionner des chiffres décimaux', () => {
    expect(addition(0.1, 0.2)).toBeCloseTo(0.3)
  })

  test('Un NaN se propage', () => {
    expect(addition(1, undefined)).toBeNaN()
  })
})

describe('Tests unitaires pour la méthode soustraction()', () => {

  test('Je peux soustraire deux chiffres positifs', () => {
    expect(soustraction(10, 4)).toBe(6)
  })

  test('Je peux soustraire deux chiffres négatifs', () => {
    expect(soustraction(-10, -4)).toBe(-6)
  })

  test('Je peux soustraire des chiffres décimaux', () => {
    expect(soustraction(0.3, 0.1)).toBeCloseTo(0.2)
  })
})

describe('Tests unitaires pour la méthode multiplication()', () => {

  test('Je peux multiplier deux chiffres positifs', () => {
    expect(multiplication(4, 6)).toBe(24)
  })

  test('Je peux multiplier deux chiffres négatifs', () => {
    expect(multiplication(-4, -6)).toBe(24)
  })

  test('Je peux multiplier un positif et un négatif', () => {
    expect(multiplication(-4, 6)).toBe(-24)
  })

  test('Multiplier par zéro donne zéro', () => {
    expect(multiplication(4, 0)).toBe(0)
  })
})

describe('Tests unitaires pour la méthode division()', () => {

  test('Je peux diviser deux chiffres positifs', () => {
    expect(division(10, 2)).toBe(5)
  })

  test('Je peux diviser avec un résultat décimal', () => {
    expect(division(1, 3)).toBeCloseTo(0.333)
  })

  test('Je peux diviser un chiffre négatif', () => {
    expect(division(-10, 2)).toBe(-5)
  })

  test('On renvoie une erreur si on divise par zéro', () => {
    expect(() => division(10, 0)).toThrow('Division par zéro impossible')
  })
})
