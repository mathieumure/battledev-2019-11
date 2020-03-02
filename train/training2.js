
const run = (input) => {
    const [line1, line2] = input
    const [nbItem] = line1.split(' ')
    const ages = line2.split(' ').map(it => parseInt(it, 10))

    const agesBetween5And9 = ages.filter(it => it >= 5 && it <= 9)

    return agesBetween5And9.length
}

module.exports = run