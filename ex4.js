class Stone {
    constructor([value, weight]) {
        this.pricePerWeight = value / weight
        this.value = value
        this.weight = weight
    }
}

class Powder {
    constructor([pricePerWeight, amount]) {
        this.pricePerWeight = pricePerWeight
        this.amount = amount
    }
}

const run = input => {
    const [line1] = input

    const [nbRock, nbPowder, lampeCapacity] = line1.split(' ').map(it => parseInt(it))

    const stones = input.slice(1, nbRock + 1)
        .map(it =>
            it.split(' ').map(it => parseInt(it, 10))
        )
        .map(it => new Stone(it))

    const powders = input.slice(nbRock + 1, nbPowder + nbRock + 2)
        .map(it =>
            it.split(' ').map(it => parseInt(it, 10))
        )
        .map(it => new Powder(it))

    const sortedByInterest = [...stones, ...powders].sort((a, b) => b.pricePerWeight - a.pricePerWeight)

    console.error(sortedByInterest)
    const taken = []
    let currentWeight = 0
    sortedByInterest.find(it => {
        if (it instanceof Stone) {
            const nextWeight = currentWeight + it.weight
            if (nextWeight < lampeCapacity) {
                taken.push(it)
                currentWeight = nextWeight
            }
        } else {
            const nextWeight = currentWeight + it.amount
            if (nextWeight < lampeCapacity ) {
                it.amountTaken = it.amount
                taken.push(it)
                currentWeight = nextWeight
            } else {
                it.amountTaken = lampeCapacity - currentWeight
                taken.push(it)
                currentWeight = nextWeight
                return true;
            }
        }
    })

    return taken.reduce((acc, it) => {
        if (it instanceof Stone) {
            return acc + it.value
        } else {
            return acc + (it.pricePerWeight * it.amountTaken)
        }
    }, 0)
}

module.exports = run