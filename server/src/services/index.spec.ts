import { memoise } from './index';

describe('services', () => {
  describe('memoise', () => {
    it('should store function results based on arguments as a key', () => {
      const doubleSpy = jest.fn();
      const addSpy = jest.fn();
      const meaningSpy = jest.fn();

      const double = (a: number) => {
        doubleSpy();
        return a * 2;
      };
      const add = (a: number, b: number) => {
        addSpy();
        return a + b;
      };
      const meaning = () => {
        meaningSpy();
        return 42;
      };

      const doubleM = memoise(double);
      const addM = memoise(add);
      const meaningM = memoise(meaning);

      doubleM(3);
      expect(doubleM(3)).toBe(6);

      expect(doubleSpy).toHaveBeenCalledTimes(1);
      doubleM(3);
      doubleM(3);
      doubleM(3);
      expect(doubleSpy).toHaveBeenCalledTimes(1);
      expect(doubleM(6)).toBe(12);

      expect(addM(3, 4)).toBe(7);
      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addM(3, 4)).toBe(7);
      expect(addSpy).toHaveBeenCalledTimes(1);

      expect(meaningM()).toBe(42);
      expect(meaningM()).toBe(42);
      expect(meaningSpy).toHaveBeenCalledTimes(1);
    });
  });
});
