const run = require('../training4')

it('should work', () => {
    const input = ['6',
        'p m r c s f',
        'g o j n m q',
        'sbeuosf mRnykKBhD cPnXH ehyjrxpz kgwi xpg sfYWugai kjusQj iJhgyzU ppg nzxo kaf iyzmy qsnk XcIy jvhmpa Jmqqgmo Tjgj noxhuC Dtluz mTuclU hkuph eiw mhg yfrqfhsCi ZltBBeKDW gYknq RGNa uVljvoo PAouUKK dwpkIh CmTtUq lthXbp btkyf drshU foxcr arlgqfdc imJ cUjkoHx uyp jbPbHv qNj TmSm ijlqv pwtNpr lyogT ukV zofNy uiUjBbz qvzbg VTj Msnqe dkcnv ivi oVdtx wSfQZvsr XxpRc uhzjw mtq oLhm bdqzxj ePrudRV nhyx xhhi htL psCqhd aUT bOruvl idoo uxoah'];

    expect(run(input)).toEqual('mbeuomq oJnykKBhD nGnXH ehyjjxgz kgwi xgg mqYWugai kjumQj iJhgyzU ggg nzxo kaq iyzoy qmnk XnIy jvhoga Joqqgoo Tjgj noxhuN Dtluz oTunlU hkugh eiw ohg yqjqqhmNi ZltBBeKDW gYknq JGNa uVljvoo GAouUKK dwgkIh NoTtUq lthXbg btkyq djmhU qoxnj ajlgqqdn ioJ nUjkoHx uyg jbGbHv qNj ToMo ijlqv gwtNgj lyogT ukV zoqNy uiUjBbz qvzbg VTj Omnqe dknnv ivi oVdtx wMqQZvmj XxgJn uhzjw otq oLho bdqzxj eGjudJV nhyx xhhi htL gmNqhd aUT bOjuvl idoo uxoah')
})

