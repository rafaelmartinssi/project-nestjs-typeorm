export function add(x: number, y: number) {
  return x + y;
}

describe('Initial test', () => {
  test('Add function', () => {
    expect(add(2, 3)).toEqual(5);
  });
});
