import readState from "./readState";
import {set, setAll} from "./set";

const baseURL = 'http://192.168.1.4/30000'
const run = async () => {
    // await set(baseURL, 16, true)
    await setAll(baseURL, false)
    const state = readState(baseURL)
    console.log(await state)

}
run()
