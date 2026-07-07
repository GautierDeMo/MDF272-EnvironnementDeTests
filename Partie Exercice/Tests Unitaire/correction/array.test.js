/*  Merci Gautier   */

const { sumArray, findMax, removeDuplicates, flatten } = require("../../functions/arrayUtils")

describe('Tests unitaires pour la méthode sumArray()', () => {

  test('Je peux additionner des chiffres positifs dans un array', () => {
    expect(sumArray([1, 2, 3, 4])).toBe(10)
  })

  test('Je peux additionner des chiffres négatifs', () => {
    expect(sumArray([-5, -12, -47, -58])).toBe(-122)
  })

  test('Je peux additionner un array vide', () => {
    expect(sumArray([])).toBe(0)
  })

  test('Je peux additionner un tableau avec un seul élément', () => {
    expect(sumArray([6])).toBe(6)
  })

  test('Je peux additionner des chiffres positifs ET négatifs en même temps', () => {
    expect(sumArray([-5, 10])).toBe(5)
  })

  test('Je peux additionner des chiffres décimaux', () => {
    expect(sumArray([1.4, 2.5])).toBeCloseTo(3.9)
  })

  test('Je ne peux pas additionner des éléments non numériques et retourner un nombre', () => {
    expect(sumArray(['1', '2', '3'])).toBe('0123')
    expect(sumArray(['1', 2, 3])).toBe('0123')
  })

  test("On renvoie une erreur si on n'additionne pas un array", () => {
    const error = 'Input must be an array'
    expect(() => sumArray("Ceci n'est pas un array")).toThrow(error)
    expect(() => sumArray(12)).toThrow(error)
    expect(() => sumArray({ test: "test" })).toThrow(error)
    expect(() => sumArray(true)).toThrow(error)
  })

  test('Un NaN se propage', () => {
    expect(sumArray([1, NaN, 3])).toBeNaN()
  })
})

describe('Tests unitaires pour la méthode findMax()', () => {

  test("Si l'argument est un array vide OU s'il n'est pas un array, alors la méthode renvoie une erreur", () => {
    const error = 'Input must be a non-empty array'
    expect(() => findMax([])).toThrow(error)
    expect(() => findMax('test')).toThrow(error)
    expect(() => findMax(true)).toThrow(error)
    expect(() => findMax({ test: 'yeah' })).toThrow(error)
    expect(() => findMax(13)).toThrow(error)
  })

  test("J'arrive à trouver le chiffre le plus haut dans un tableau de chiffres positifs", () => {
    expect(findMax([1, 6, 78])).toBe(78)
  })

  test("J'arrive à trouver le chiffre le plus haut dans un tableau de chiffres négatifs", () => {
    expect(findMax([-1, -6, -78])).toBe(-1)
  })

  test("J'arrive à trouver le chiffre le plus haut dans un tableau d'un seul élément", () => {
    expect(findMax([145])).toBe(145)
  })

  test('Un NaN se propage', () => {
    expect(findMax([1, NaN, 3])).toBeNaN()
  })
})

describe('Tests unitaires pour la méthode removeDuplicates()', () => {

  test("Si l'argument n'est pas un array, alors la méthode renvoie une erreur", () => {
    const error = 'Input must be an array'
    expect(() => removeDuplicates('test')).toThrow(error)
    expect(() => removeDuplicates(true)).toThrow(error)
    expect(() => removeDuplicates({ test: 'yeah' })).toThrow(error)
    expect(() => removeDuplicates(13)).toThrow(error)
  })

  test("Si le tableau a un/des doublon(s)", () => {
    expect(removeDuplicates([1, 2, 2, 3])).toStrictEqual([1, 2, 3])
  })

  test("Si le tableau n'a pas de doublon", () => {
    expect(removeDuplicates([1, 2, 3])).toStrictEqual([1, 2, 3])
  })

  test('Si le tableau est vide', () => {
    expect(removeDuplicates([])).toStrictEqual([])
  })

  test("Que l'ordre du tableau soit préservé", () => {
    expect(removeDuplicates([3, 1, 3, 4])).not.toStrictEqual([1, 3, 4])
    expect(removeDuplicates([3, 1, 3, 4])).toStrictEqual([3, 1, 4])
  })

  test('Les doublons sautent même si ce sont des strings', () => {
    expect(removeDuplicates(['1', 2, '4'])).toStrictEqual(['1', 2, '4'])
    expect(removeDuplicates(['1', 2, '1'])).toStrictEqual(['1', 2])
  })

  test("Deux objets ne se dédoublonnent pas s'ils ont des références différentes", () => {
    expect(removeDuplicates([{}, {}])).toStrictEqual([{}, {}])
  })

  test("Deux objets se dédoublonnent s'ils ont la même référence", () => {
    const object = {}
    expect(removeDuplicates([object, object])).toStrictEqual([object])
  })

  test('Deux NaN fusionnent bien en un seul', () => {
    expect(removeDuplicates([NaN, NaN])).toStrictEqual([NaN])
  })
})

describe('Tests unitaires pour la méthode flatten()', () => {

  test('Un seul niveau de profondeur est géré', () => {
    expect(flatten([1, [2, 3]])).toStrictEqual([1, 2, 3])
  })

  test('Deux niveaux de profondeur ne sont pas gérés', () => {
    expect(flatten([1, [2, [3]]])).toStrictEqual([1, 2, [3]])
  })

  test('Si un sous tableau est vide, il est bien retiré', () => {
    expect(flatten([1, 2, []])).toStrictEqual([1, 2])
  })

  test('Si le tableau est déjà à plat, rien ne change', () => {
    expect(flatten([1, 2, 3])).toStrictEqual([1, 2, 3])
  })

  test('Un tableau vide le reste', () => {
    expect(flatten([])).toStrictEqual([])
  })

  test("Si l'argument n'est pas un array, alors la méthode renvoie une erreur", () => {
    const error = 'Input must be an array'
    expect(() => flatten('test')).toThrow(error)
    expect(() => flatten(true)).toThrow(error)
    expect(() => flatten(12)).toThrow(error)
    expect(() => flatten({ test: 'yes'})).toThrow(error)
  })
})