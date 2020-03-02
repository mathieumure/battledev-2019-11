const run = input => {
    const data = input.map(it => parseInt(it))

    const min = Math.min(...data)

    const waste = data.reduce((acc, it) => {
        acc += it - min
        return acc
    }, 0)

    return waste
}

module.exports = run