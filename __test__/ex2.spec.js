const run = require('../ex2')

it('ex2 should work', () => {
    const input = [ '43', '35', '8', '36' ];

    expect(run(input)).toEqual(90)
})