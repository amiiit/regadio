import fetch from "node-fetch";
import parseState, {RelaysState} from "./parseState";

const MAX_REQUEST_ATTEMPTS = 8
const NUM_OF_RELAYS = 16
const readSinglePage = async (baseURL: string) => {
    const result = await fetch(`${baseURL}/43`)
    return parseState(await result.text())
}
const readState = async (baseURL: string): Promise<RelaysState> => {
    let globalResult = {}

    let requestCounter = 0;
    while (Object.entries(globalResult).length < NUM_OF_RELAYS && requestCounter < MAX_REQUEST_ATTEMPTS) {
        requestCounter++
        const pageResult = await readSinglePage(baseURL)
        globalResult = {
            ...globalResult,
            ...pageResult
        }
    }

    return globalResult
}

export default readState
