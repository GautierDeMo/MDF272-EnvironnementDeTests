describe('Tests unitaires pour la méthode sumArray()', () => {

  test("On renvoie une erreur si on n'additionne pas un array", () => {
    const error = 'Input must be an array'
    expect(sumArray("Ceci n'est pas un array")).toThrow(error)
    expect(sumArray(12)).toThrow(error)
    expect(sumArray({ test: "test" })).toThrow(error)
    expect(sumArray(true)).toThrow(error)
  })
})

/*
 ● Tests unitaires pour la méthode sumArray() › On renvoie une erreur si on n'additionne pas un array

    Input must be an array

      1 | function sumArray(numbers) {
      2 |   if (!Array.isArray(numbers)) {
> 3 |     throw new Error('Input must be an array');
        |           ^
      4 |   }
      5 |   return numbers.reduce((sum, num) => sum + num, 0);
      6 | }

      at sumArray (Partie Exercice/Tests Unitaire/functions/arrayUtils.js:3:11)
      at Object.sumArray (Partie Exercice/Tests Unitaire/tests/niv1/arrayUtils.test.js:36:12)
*/

describe('Tests unitaires pour la méthode sumArray()', () => {

  test("On renvoie une erreur si on n'additionne pas un array", () => {
    const error = 'Input must be an array'
    expect(() => sumArray("Ceci n'est pas un array")).toThrow(error)
    expect(() => sumArray(12)).toThrow(error)
    expect(() => sumArray({ test: "test" })).toThrow(error)
    expect(() => sumArray(true)).toThrow(error)
  })
})

/* sumArray("Ceci n'est pas un array") => Je dois executer cette fonction, dès maintenant ( = au lancement du fichier )

() => sumArray("Ceci n'est pas un array") = function anon () { sumArray("Ceci n'est pas un array") }

node => jest (npm run test / jest) => lis les fichiers tests => expect => expect lance la fonction et attendre le résultat

<button onClick={() => sumArray("Ceci n'est pas un array")}>Mon Bouton</button>*/