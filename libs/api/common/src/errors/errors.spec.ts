import {ValidationError, InternalError} from './errors';
const util = require('util');

describe('domain errors', () => {
  test('should throw InternalError', () => {
    try {
      function doSomethingBad2() {
        throw new InternalError({message: 'It went bad!', data: 42, title: 'public message'});
      }
      doSomethingBad2();
    } catch (err) {
      expect(err.name).toBe('InternalError');
      expect(err instanceof InternalError).toBe(true);
      expect(err instanceof Error).toBe(true);
      expect(util.isError(err)).toBe(true);
      expect(err.stack).toBeDefined();
      expect(err.toString()).toBe('InternalError: It went bad!');
      expect(err.stack.split('\n')[0]).toBe('InternalError: It went bad!');
      expect(err.stack.split('\n')[1].indexOf('doSomethingBad2')).toBe(7);
      expect(err.data).toBe(42);
      expect(err.title).toBe('public message');
    }
  });
  test('should throw ValidationError', () => {
    try {
      function doSomethingBad() {
        throw new ValidationError({message: 'It went bad!', data: {test: 'data'}, title: 'my message'});
      }
      doSomethingBad();
    } catch (err) {
      expect(err.name).toBe('ValidationError');
      expect(err instanceof ValidationError).toBe(true);
      expect(err instanceof Error).toBe(true);
      expect(util.isError(err)).toBe(true);
      expect(err.stack).toBeDefined();
      expect(err.toString()).toBe('ValidationError: It went bad!');
      expect(err.stack.split('\n')[0]).toBe('ValidationError: It went bad!');
      expect(err.stack.split('\n')[1].indexOf('doSomethingBad')).toBe(7);
      expect(err.data).toEqual({test: 'data'});
      expect(err.title).toBe('my message');
    }
  });
});
