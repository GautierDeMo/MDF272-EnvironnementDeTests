/*  Merci à Louis  */

const { isWeekend, addDays, formatDate, daysBetween } = require('../utils/dateUtils');

describe('isWeekend', () => {
  test('retourne true pour un samedi', () => {
    // Arrange
    const samedi = new Date('2025-01-04');

    // Act
    const result = isWeekend(samedi);

    // Assert
    expect(result).toBe(true);
  });

  test('retourne true pour un dimanche', () => {
    // Arrange
    const dimanche = new Date('2025-01-05');

    // Act
    const result = isWeekend(dimanche);

    // Assert
    expect(result).toBe(true);
  });

  test('retourne false pour un lundi', () => {
    // Arrange
    const lundi = new Date('2025-01-06');
    const startWeek = [
      new Date('2025-01-06'),
      new Date('2025-01-07'),
      new Date('2025-01-08')
    ]
    // Act
    const result = isWeekend(lundi);

    // Assert
    expect(result).toBe(false);
    
    startWeek.forEach(d => {
      expect(() => {isWeekend(d)}).toBe(false);
    });
  });

  test('retourne false pour un vendredi', () => {
    // Arrange
    const vendredi = new Date('2025-01-03');

    // Act
    const result = isWeekend(vendredi);

    // Assert
    expect(result).toBe(false);
  });

  test('lance une erreur si l\'entrée n\'est pas une Date', () => {
    // Arrange
    const entreeChaine = '2025-01-04';
    const entreeNull = null;
    const entreeNombre = 123;

    // Act & Assert
    expect(() => isWeekend(entreeChaine)).toThrow('Input must be a Date object');
    expect(() => isWeekend(entreeNull)).toThrow('Input must be a Date object');
    expect(() => isWeekend(entreeNombre)).toThrow('Input must be a Date object');
  });
});

describe('addDays', () => {
  test('ajoute un nombre positif de jours', () => {
    // Arrange
    const date = new Date('2025-01-01');
    const jours = 5;

    // Act
    const result = addDays(date, jours);

    // Assert
    expect(formatDate(result)).toBe('2025-01-06');
  });

  test('soustrait des jours avec un nombre négatif', () => {
    // Arrange
    const date = new Date('2025-01-10');
    const jours = -3;

    // Act
    const result = addDays(date, jours);

    // Assert
    expect(formatDate(result)).toBe('2025-01-07');
  });

  test('ajouter zéro jour ne change pas la date', () => {
    // Arrange
    const date = new Date('2025-06-15');
    const jours = 0;

    // Act
    const result = addDays(date, jours);

    // Assert
    expect(formatDate(result)).toBe('2025-06-15');
  });

  test('ne modifie pas la date originale', () => {
    // Arrange
    const date = new Date('2025-01-01');

    // Act
    addDays(date, 10);

    // Assert
    expect(formatDate(date)).toBe('2025-01-01');
  });

  test('lance une erreur si le premier argument n\'est pas une Date', () => {
    // Arrange
    const entreeChaine = '2025-01-01';
    const entreeNull = null;

    // Act & Assert
    expect(() => addDays(entreeChaine, 5)).toThrow('First argument must be a Date object');
    expect(() => addDays(entreeNull, 5)).toThrow('First argument must be a Date object');
  });

  test('lance une erreur si le nombre de jours n\'est pas un entier', () => {
    // Arrange
    const date = new Date('2025-01-01');
    const joursDecimal = 1.5;
    const joursChaine = '5';

    // Act & Assert
    expect(() => addDays(date, joursDecimal)).toThrow('Days must be an integer');
    expect(() => addDays(date, joursChaine)).toThrow('Days must be an integer');
  });
});

describe('formatDate', () => {
  test('formate une date au format YYYY-MM-DD', () => {
    // Arrange
    const date = new Date('2025-03-15');

    // Act
    const result = formatDate(date);

    // Assert
    expect(result).toBe('2025-03-15');
  });

  test('formate correctement les mois et jours à un chiffre (avec zéro)', () => {
    // Arrange
    const date = new Date('2025-01-05');

    // Act
    const result = formatDate(date);

    // Assert
    expect(result).toBe('2025-01-05');
  });

  test('lance une erreur si l\'entrée n\'est pas une Date', () => {
    // Arrange
    const entreeChaine = '2025-01-01';
    const entreeNull = null;
    const entreeNombre = 20250101;

    // Act & Assert
    expect(() => formatDate(entreeChaine)).toThrow('Input must be a Date object');
    expect(() => formatDate(entreeNull)).toThrow('Input must be a Date object');
    expect(() => formatDate(entreeNombre)).toThrow('Input must be a Date object');
  });
});

describe('daysBetween', () => {
  test('calcule le nombre de jours entre deux dates', () => {
    // Arrange
    const date1 = new Date('2025-01-01');
    const date2 = new Date('2025-01-11');

    // Act
    const result = daysBetween(date1, date2);

    // Assert
    expect(result).toBe(10);
  });

  test('retourne la valeur absolue (date2 avant date1)', () => {
    // Arrange
    const date1 = new Date('2025-01-11');
    const date2 = new Date('2025-01-01');

    // Act
    const result = daysBetween(date1, date2);

    // Assert
    expect(result).toBe(10);
  });

  test('retourne 0 si les deux dates sont identiques', () => {
    // Arrange
    const date = new Date('2025-06-01');

    // Act
    const result = daysBetween(date, date);

    // Assert
    expect(result).toBe(0);
  });

  test('lance une erreur si le premier argument n\'est pas une Date', () => {
    // Arrange
    const dateValide = new Date('2025-01-01');
    const entreeChaine = '2025-01-01';

    // Act & Assert
    expect(() => daysBetween(entreeChaine, dateValide)).toThrow('Both arguments must be Date objects');
  });

  test('lance une erreur si le second argument n\'est pas une Date', () => {
    // Arrange
    const dateValide = new Date('2025-01-01');
    const entreeChaine = '2025-01-11';

    // Act & Assert
    expect(() => daysBetween(dateValide, entreeChaine)).toThrow('Both arguments must be Date objects');
  });

  test('lance une erreur si les deux arguments ne sont pas des Dates', () => {
    // Arrange
    const entreeNull1 = null;
    const entreeNull2 = null;

    // Act & Assert
    expect(() => daysBetween(entreeNull1, entreeNull2)).toThrow('Both arguments must be Date objects');
  });
});
