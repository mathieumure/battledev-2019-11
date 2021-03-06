const run = require('../ex3')

it('ex3 should work nope', () => {
    const input = [ '10 21',
        '488 1044',
        '1652 1737',
        '153 349',
        '700 1504',
        '360 1497',
        '1569 2014',
        '1756 1914',
        '1148 2222',
        '1094 2257',
        '1992 2297',
        '1639 2460',
        '2461 2492',
        '377 1491',
        '2359 2459',
        '144 221',
        '1319 1369',
        '219 1420',
        '1744 1823',
        '1933 2046',
        '882 2446',
        '2047 2378' ];

    expect(run(input)).toEqual('9 1 10 5 4 10 8 7 6 5 9 8 8 2 1 1 2 2 4 3 1')
})

it('ex3 should work', () => {
    const input = [ '6 7',
        '1 3',
        '1 4',
        '1 5',
        '1 6',
        '1 7',
        '2 9',
        '3 11' ];

    expect(run(input)).toEqual('1 2 3 4 5 6 1')
})
