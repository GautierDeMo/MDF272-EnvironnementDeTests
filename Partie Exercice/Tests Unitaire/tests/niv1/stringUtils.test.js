const { capitalize, reverse, isPalindrome, countVowels } = require("../../functions/stringUtils")

describe('Tests unitaires pour la méthode capitalize()', () => {

  test('Je mets la première lettre en majuscule', () => {
    expect(capitalize('bonjour')).toBe('Bonjour')
    expect(capitalize('paris')).toBe('Paris')
    expect(capitalize('gautier')).toBe('Gautier')
  })

  test('Un mot déjà capitalisé ne change pas', () => {
    expect(capitalize('Bonjour')).toBe('Bonjour')
  })

  test('Une chaîne vide reste vide', () => {
    expect(capitalize('')).toBe('')
  })

  test("On renvoie une erreur si l'argument n'est pas une string", () => {
    const error = 'Input must be a string'
    expect(() => capitalize(12)).toThrow(error)
    expect(() => capitalize(true)).toThrow(error)
    expect(() => capitalize(null)).toThrow(error)
    expect(() => capitalize(undefined)).toThrow(error)
    expect(() => capitalize(['test'])).toThrow(error)
    expect(() => capitalize({ test: 'yeah' })).toThrow(error)
  })
})

describe('Tests unitaires pour la méthode reverse()', () => {

  test("J'inverse l'ordre des caractères", () => {
    expect(reverse('abc')).toBe('cba')
  })

  test('Une chaîne vide reste vide', () => {
    expect(reverse('')).toBe('')
  })

  test("On renvoie une erreur si l'argument n'est pas une string", () => {
    const error = 'Input must be a string'
    expect(() => reverse(12)).toThrow(error)
    expect(() => reverse(true)).toThrow(error)
    expect(() => reverse(['test'])).toThrow(error)
    expect(() => reverse({ test: 'yeah' })).toThrow(error)
  })
})

describe('Tests unitaires pour la méthode isPalindrome()', () => {

  test('Un palindrome simple renvoie true', () => {
    expect(isPalindrome('kayak')).toBe(true)
  })

  test("Un mot qui n'est pas un palindrome renvoie false", () => {
    expect(isPalindrome('bonjour')).toBe(false)
  })

  test("On renvoie une erreur si l'argument n'est pas une string", () => {
    const error = 'Input must be a string'
    expect(() => isPalindrome(12)).toThrow(error)
    expect(() => isPalindrome(true)).toThrow(error)
    expect(() => isPalindrome(['test'])).toThrow(error)
    expect(() => isPalindrome({ test: 'yeah' })).toThrow(error)
  })

  test('La méthode ignore bien la casse, les espaces, et la ponctuation', () => {
    expect(isPalindrome('Engage le jeu que je le gagne')).toBe(true)
  })

  test('La méthode ne prend pas en compte les accents et les supprime tout simplement', () => {
    expect(isPalindrome('Ésope reste ici et se repose')).toBe(false)
  })
})

describe('Tests unitaires pour la méthode countVowels()', () => {

  test('Je compte les voyelles minuscules', () => {
    expect(countVowels('bonjour')).toBe(3)
  })

  test('Je compte aussi les voyelles majuscules', () => {
    expect(countVowels('AEIOUY')).toBe(6)
  })

  test("On renvoie une erreur si l'argument n'est pas une string", () => {
    const error = 'Input must be a string'
    expect(() => countVowels(12)).toThrow(error)
    expect(() => countVowels(true)).toThrow(error)
    expect(() => countVowels(['test'])).toThrow(error)
    expect(() => countVowels({ test: 'yeah' })).toThrow(error)
  })

  test('Si la string ne contient pas de voyelle, on renvoie bien 0', () => {
    expect(countVowels('wxz')).toBe(0)
  })
})
