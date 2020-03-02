const slicesOverlaps = (slice1, slice2) => {
    const [ start1, end1 ] = slice1
    const [ start2, end2 ] = slice2

    if (start1 < start2) {
        return start2 < end1
    } else {
        return start1 < end2
    }
}

class Wire {
    constructor ({id}) {
        this.id = id
        this.slicesOfTimeUsed = []
    }

    isAvailable (sliceOfTime) {
        const isReserved = this.slicesOfTimeUsed.find(it => slicesOverlaps(sliceOfTime, it))
        return !isReserved
    }

    reserveFor (sliceOfTime) {
        this.slicesOfTimeUsed.push(sliceOfTime)
    }
}

const run = input => {
    const [line1, ...data] = input

    const [nbWires, nbRequest] = line1.split(' ').map(it => parseInt(it))

    const wires = []

    for (let i = 0; i < nbWires; i++) {
        wires.push(new Wire({ id: i + 1}))
    }

    const assignments = data.map(it => {
        const sliceOfTime = it.split(' ').map(it => parseInt(it))
        console.error(sliceOfTime)
        const availableWire = wires.find(wire => wire.isAvailable(sliceOfTime))
        if (availableWire) {
            availableWire.reserveFor(sliceOfTime)
            return availableWire.id
        }

        return 'nope'
    })

    const result = assignments.join(' ')

    return result.includes('nope') ? 'pas possible' : result;
}

module.exports = run