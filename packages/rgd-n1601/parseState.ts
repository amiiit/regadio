import {JSDOM} from "jsdom";

export type RelaysState = {[n: number]: boolean}
const parseState =  (pageContent: string): RelaysState => {
    const hello = new JSDOM(pageContent)
    const document =  hello.window.document
    const text = document.body.textContent
    const relays = text!.split('ALL-OFF')[1].trim().split('Change IP/Port')[0].trim()
    const regex = /Relay-(\d{1,2}):.{2,3}((ON)|(OFF))/g
    const entries = relays.matchAll(regex)
    const result: {[n: number]: boolean} = {}
    // entries of type 'Relay-xx:  OFF|ON'
    for (const entry of entries) {
        const number = parseInt(entry[1])
        const state = entry[2]
        if (state !== 'ON' && state !== 'OFF') {
            throw new Error('regex error in finding state of relay')
        }
        result[number] = state === 'ON'
    }

    return result
}

export default parseState
