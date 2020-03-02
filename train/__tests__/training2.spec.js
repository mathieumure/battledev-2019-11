const run = require('../training2')

it('should work', () => {
    const input = ['13',
        '2 15 8 4 10 11 6 6 12 3 9 9 8'];

    expect(run(input)).toEqual(6)
})

