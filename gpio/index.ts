import {Gpio} from 'onoff';
import inventory from "../inventory";

type State = {
	[name: string]: Gpio
}

const gpioState: State = {}
// Start with all inventory states to be false.
Object.keys(inventory).forEach(iKey => {
	// Relay controller is ON on LOW. Initializing with HIGH so it starts as OFF.
	gpioState[iKey] = new Gpio(inventory[iKey], "high")
	console.log('setting up', iKey, inventory[iKey])
})

const getState = () => Object.keys(inventory).map(iKey => {
	console.log('get state for ', iKey)
	const keyState = gpioState[iKey].readSync()
	console.log('keyState', keyState)
	return Boolean(keyState)
})

export {gpioState, getState}
