
// For example URLs for relay 4 are http://192.168.1.4/30000/06 to unset, and http://192.168.1.4/30000/07 to set
import fetch from "node-fetch";

const unsetSetCodes = (relay: number) => ({unset: relay * 2 - 2, set: relay * 2 - 1})

const set = async (baseURL: string, relay: number, state: boolean) => {
    const relayEndpoints = unsetSetCodes(relay)
    const endpointToUse = state ? relayEndpoints.set : relayEndpoints.unset
    return fetch(`${baseURL}/${String(endpointToUse).padStart(2,'0')}`)
}
const setAll = async (baseURL: string, state: boolean) => {
    return fetch(`${baseURL}/${state ? '45' : '44'}`)
}
export {set, setAll}
