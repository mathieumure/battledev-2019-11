const run = input => {
    const [line1, ...data] = input

    const looser = data.reduce((acc, it) => {
        const [name, lengthStr] = it.split(' ');
        const length = parseInt(lengthStr)

        if (acc.length > length) {
            return { name, length }
        }

        return acc;

    }, {name: '', length: Infinity })

    return looser.name
}

module.exports = run