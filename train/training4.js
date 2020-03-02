
const run = (input) => {
    const [line1, line2, line3, line4] = input
    const nbBuggedTouch = line1.split(' ').map(it => parseInt(it, 10))
    const buggedTouch = line2.split(' ')
    const mappedTouch = line3.split(' ')
    const toTranslate = line4

    const map = {}

    for (let i = 0; i < nbBuggedTouch; i++) {
        map[buggedTouch[i]] = mappedTouch[i]
        map[buggedTouch[i].toUpperCase()] = mappedTouch[i].toUpperCase()
    }
    console.error(map)

    const translatedText = toTranslate.split('').map(it => map[it] || it)


    return translatedText.join('')
}

module.exports = run