
const run = (input) => {
    const [line1, ...data] = input
    const [nbItem] = line1.split(' ')
    const peoplePerBoat = data.map(it => parseInt(it, 10))

    const NB_PEOPLE_PER_BOAT = 10
    console.error(peoplePerBoat)
    const travelPerBoat = peoplePerBoat.map(it => Math.ceil(it / NB_PEOPLE_PER_BOAT))
    console.error(travelPerBoat)
    const nbTravels = travelPerBoat.reduce((acc, it) => acc + it, 0)

    return nbTravels
}

module.exports = run