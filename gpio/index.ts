import {Gpio} from 'onoff';
import inventory from "../inventory";

type State = {
	[name: string]: Gpio
}

const state: State = {}
// Start with all inventory states to be false.
Object.keys(inventory).forEach(iKey => {
	// Relay controller is ON on LOW. Initializing with HIGH so it starts as OFF.
	state[iKey] = new Gpio(inventory[iKey], "high")
})

export { state }
