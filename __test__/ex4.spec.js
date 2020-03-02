const run = require('../ex4')

it('ex4 should work', () => {
    const input = [
        '2 2 100',
        '600 40',
        '1000 50',
        '20 40',
        '15 80'
    ];

    expect(run(input)).toEqual(1950)
})