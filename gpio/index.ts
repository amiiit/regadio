import {Gpio} from 'onoff';
import inventory from "../inventory";

type State = {
	[name: string]: Gpio
}
const gpioState: State = {}

type ReadableState = {
	[name: string]: {
		name: string,
		state: 'on' | 'off',
		gpio: number
	}
}
// Start with all inventory states to be false.
Object.keys(inventory).forEach(iKey => {
	// Relay controller is ON on LOW. Initializing with HIGH so it starts as OFF.
	gpioState[iKey] = new Gpio(inventory[iKey], "high")
	console.log('setting up', iKey, inventory[iKey])
})

const getState = () => {
	const result: ReadableState = {}
	Object.keys(inventory).forEach(iKey => {
		console.log('get state for ', iKey)
		const keyState = gpioState[iKey].readSync()
		console.log('keyState', keyState)
		result[iKey] = {
			name: iKey,
			// Switch board is low-based
			state: gpioState[iKey].readSync() === Gpio.HIGH ? 'off' : 'on',
			gpio: inventory[iKey]
		}

	})
	return result

}
export {gpioState, getState}
