const run = require('../ex6')

it('ex6 should work', () => {
    const input = [
        '5 50',
        '9 11'
    ];

    expect(run(input)).toEqual(3)
})