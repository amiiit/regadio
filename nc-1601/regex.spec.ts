import parseState from "./parseState";

describe('match', () => {
    const text = 'Relay-ALL  ON       ALL-ONRelay-ALL OFF       ALL-OFF Relay-13:  ON   ON/OFF-13 Relay-14:  OFF   ON/OFF-14 Relay-15:  OFF   ON/OFF-15 Relay-16:  OFF   ON/OFF-16 Change IP/Port:      Enter Next Page\n'
    it('', () => {
        const result = parseState(text)
        console.log(result)
        expect(result[12]).toBeUndefined()

        expect(result[13]).toBeTruthy()
        expect(result[14]).toBeFalsy()
        expect(result[15]).toBeFalsy()
        expect(result[16]).toBeFalsy()

        expect(result[17]).toBeUndefined()
    })
})
