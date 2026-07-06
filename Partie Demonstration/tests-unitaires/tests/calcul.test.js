const { addition, soustraction, multiplication } = require('../utils/calcul');

describe('Tests unitaires pour les fonctions d\'addition', () => {
    test('addition de deux nombres', () => {
        expect(addition(2, 3)).toBe(5);
        expect(addition(-1, 1)).toBe(0);
    });
    test('addition de deux nombres à virgule', () => {
        expect(addition(0.1, 0.2)).toBeCloseTo(0.3);
        expect(addition(0.9, 0.1)).toBe(1);
    });
});

describe('Tests unitaires pour les fonctions de soustraction', () => {
    test('soustraction de deux nombres', () => {
        expect(soustraction(5, 3)).toBe(2);
        expect(soustraction(0, 5)).toBe(-5);
    });
})

describe('Tests unitaires pour les fonctions de multiplication', () => {
    test('multiplication de deux nombres', () => {
        expect(multiplication(4, 3)).toBe(12);
        expect(multiplication(4, 3)).toBeGreaterThanOrEqual(12);
        expect(multiplication(4, 3)).toBeLessThan(13); //OrEqual possible aussi
        expect(multiplication(5, 3)).toBeGreaterThan(12);
        expect(multiplication(-2, 3)).toBe(-6);
    });
})

describe('Test sur un objet contenant des nombres', () => {
    const objet = { one : 1}
    objet['two'] = 2
    test("Test sur le concept des objets JS", () => {
        expect(objet).not.toBe({one: 1, two: 2})
        expect(objet).toEqual({one: 1, two: 2})
        expect(objet).toMatchObject({one: 1, two: 2})
        expect(objet).toEqual(expect.objectContaining({one: expect.any(Number), two: expect.any(Number)}))
    })
})

describe('Test sur les valeurs undefined', () => {
    let n
    test('undefined & null', () => {
        expect(n).toBe(undefined)
        expect(n).toBeUndefined()
        n = null
        expect(n).toBe(null)
        expect(n).toBeNull()
        expect(n).not.toBeUndefined()
        expect(n).toBeFalsy()
        expect(n).not.toBeTruthy()
    })
})

describe('Chaine de caractère', () => {
    test('Hello World', () => {
        const hw = 'Hello World'
        expect(hw).toBe('Hello World')
    })
    test('Hello L World', () => {
        const hw = 'Hello L World'
        expect(hw).toMatch(/L/)
    })
    test('J\'ai dit Stop', () => {
        const message = 'Anna say hello to christophe'
        expect(message).toMatch(/stop/)
    })
})

describe('Array Function', () => {
    test('Tableau simple 1,2,3', () => {
        const tab = [1,2,3]
        expect(tab).toEqual([1,2,3])
        expect(tab).not.toEqual([1,2])
        expect(tab).toContain(2)
        expect(tab).not.toContain(4)
    })
    test('Tableau string', () => {
        const arr = [
            "milka",
            "coca",
            "fanta"
        ]
        expect(arr).toContain("fanta")
        expect(arr).toContain("milka", "coca")
    })
    test('Tableau avec Object', () => {
        const todo = [
            {
                id: 1,
                title: "Buy milk",
                completed: false
            },
            {
                id: 2,
                title: "Buy bread",
                completed: false
            },
            {
                id: 3,
                title: "Buy eggs",
                completed: false
            }
        ]
        expect(todo).toEqual(
            expect.arrayOf(
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    completed: expect.any(Boolean)
                })
            )
        )
    })
})

describe('Erreur', () => {
    function genError(){
        throw new Error("This is the Cedric Error")
    }
    test("Test de génération de l'erreur", () => {
        expect(genError).toThrow()
        expect(genError).toThrow("This is the Cedric Error")
        expect(genError).toThrow(/Cedric/)
    })
})