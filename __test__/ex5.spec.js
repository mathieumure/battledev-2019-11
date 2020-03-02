const run = require('../ex5')

it('ex5 should work', () => {
    const input = [
        '5 50',
        '9 11'
    ];

    expect(run(input)).toEqual(3)
})