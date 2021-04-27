import {
  calculateHourOfDayScore,
  calculateTempScore,
} from './TemperatureUtils';

const testDataNice = {
  dt: 1619535600,
  temp: 279.39,
  feels_like: 277.42,
  pressure: 1014,
  humidity: 50,
  dew_point: 270.14,
  uvi: 0.8,
  clouds: 92,
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d',
    },
  ],
};
describe('Calculate temp scores', () => {
  test('Test boundary temps', () => {
    expect(calculateTempScore(3)).toBeLessThanOrEqual(0);

    expect(calculateTempScore(20)).toBeGreaterThanOrEqual(1);
  });
  test('Test okay temps', () => {
    expect(calculateTempScore(6)).toBeLessThanOrEqual(0.4);
    expect(calculateTempScore(6)).toBeGreaterThanOrEqual(0.2);

    expect(calculateTempScore(10)).toBeLessThanOrEqual(0.6);
    expect(calculateTempScore(10)).toBeGreaterThanOrEqual(0.4);
  });
  test('Test good temps', () => {
    expect(calculateTempScore(14)).toBeLessThanOrEqual(0.8);
    expect(calculateTempScore(14)).toBeGreaterThanOrEqual(0.6);

    expect(calculateTempScore(17)).toBeGreaterThanOrEqual(0.8);
  });
});

describe('Calculate hour scores', () => {
  test('Test night hours', () => {
    const dawn = 5;
    const lowestScore = 0.1;
    const dusk = 20;
    expect(calculateHourOfDayScore(dawn)).toBeLessThanOrEqual(lowestScore);
    expect(calculateHourOfDayScore(dusk)).toBeLessThanOrEqual(lowestScore);
  });

  test('Test early morning/late evening hours', () => {
    const earlyMorning = 5;
    const highestScore = 0.3;
    const lowestScore = 0.1;
    const lateEvening = 20;
    expect(calculateHourOfDayScore(earlyMorning)).toBeLessThanOrEqual(
      highestScore
    );
    expect(calculateHourOfDayScore(earlyMorning)).toBeGreaterThanOrEqual(
      lowestScore
    );
    expect(calculateHourOfDayScore(lateEvening)).toBeLessThanOrEqual(
      highestScore
    );
    expect(calculateHourOfDayScore(lateEvening)).toBeGreaterThanOrEqual(
      lowestScore
    );
  });

  test('Test sweet spot', () => {
    const lateMorning = 11;
    const lowestScore = 0.7;
    const earlyAfternoon = 14;
    expect(calculateHourOfDayScore(lateMorning)).toBeGreaterThanOrEqual(
      lowestScore
    );
    expect(calculateHourOfDayScore(earlyAfternoon)).toBeGreaterThanOrEqual(
      lowestScore
    );
  });

  test('Test decent hours', () => {
    const lateMorning = 9;
    const lowestScore = 0.4;
    const earlyAfternoon = 16;
    expect(calculateHourOfDayScore(lateMorning)).toBeGreaterThanOrEqual(
      lowestScore
    );
    expect(calculateHourOfDayScore(earlyAfternoon)).toBeGreaterThanOrEqual(
      lowestScore
    );
  });
});
