const run = require('../training1')

it('should work', () => {
    const input = ['5 50',
    '9 11',
    '13 17 9 9 12',
    '22 40 15 33 16 29 36 27 39 43 21 17 50',
    '13 5 8 42 49 23 30 50 12 40 20 25 47 44 34 9 41',
    '45 23 6 28 31 18 2 26 29',
    '48 29 4 3 24 26 7 11 32',
    '46 10 35 26 14 37 50 23 38 40 19 1'];

expect(run(input)).toEqual(3)
})

it('should work', () => {
    const input = ['5 50',
        '34 38',
        '12 13 10 8 11',
        '25 7 29 36 27 28 11 30 1 13 39 42',
        '44 43 48 37 31 16 12 46 45 13 4 47 24',
        '41 23 32 7 9 35 10 20 38 40',
        '50 45 3 6 34 13 17 2',
        '19 5 14 15 22 8 26 21 33 18 49'];

expect(run(input)).toEqual(2)
})