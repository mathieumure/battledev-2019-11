const run = require('../training3')

it('should work', () => {
    const input = ['13',
        '20','1','34','10','11','6','6','12','3','9','9','8'];

    expect(run(input)).toEqual(18)
})

