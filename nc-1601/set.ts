import fetch from "node-fetch";

// Calculate the right number path in NC1601. e.g. For Relay #4: 06 to unset, 07 to set.
const unsetSetCodes = (relay: number) => ({unset: relay * 2 - 2, set: relay * 2 - 1})

type SwitchState = boolean
const set = async (baseURL: string, relay: number, state: SwitchState): Promise<SwitchState> => {
    const relayEndpoints = unsetSetCodes(relay)
    const endpointToUse = state ? relayEndpoints.set : relayEndpoints.unset

    try {
        const response = await fetch(`${baseURL}/${String(endpointToUse).padStart(2, '0')}`)
        if (response.status === 200) {
            return state
        } else {
            return Promise.reject(`Controller responded with ${response.status}: ${response.body}`)
        }
    } catch (e) {
        return Promise.reject(e)
    }
}
const setAll = async (baseURL: string, state: boolean) => {
    return fetch(`${baseURL}/${state ? '45' : '44'}`)
}
export {set, setAll}
