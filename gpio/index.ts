import {BinaryValue, Gpio} from 'onoff';
import inventory from "../inventory";

export type UserState = 'on' | 'off'
type State = {
	[name: string]: Gpio
}
const gpioState: State = {}

type ReadableSwitchState = {
	name: string,
	userState: UserState,
	lowLevelValue: BinaryValue,
	gpio: number
}

type ReadableState = {
	[name: string]: ReadableSwitchState
}
// Start with all inventory states to be false.
Object.keys(inventory).forEach(iKey => {
	// Relay controller is ON on LOW. Initializing with HIGH so it starts as OFF.
	gpioState[iKey] = new Gpio(inventory[iKey], "high")
	console.log('setting up', iKey, inventory[iKey])
})

export const setUserStateForSwitch = (name: string, state: UserState) => {
	const gpio = gpioState[name]
	if (!gpio) {
		throw `GPIO does not exist for '${name}'`
	}
	const rawValueToSet = state === 'on' ? 0 : 1
	console.log(`gpio ${name}, set to ${rawValueToSet}`)
	gpio.writeSync(rawValueToSet)
	return getStateForSwitch(name)
}

export const getStateForSwitch = (name: string): ReadableSwitchState | null => {
	const gpio = gpioState[name]
	if (!gpio) {
		return null
	}
	const lowLevelValue = gpio.readSync()
	return {
		name,
		// Switch board is low-based
		lowLevelValue,
		userState: lowLevelValue === Gpio.HIGH ? 'off' : 'on',
		gpio: inventory[name]
	}
}

const getState = () => {
	const result: ReadableState = {}
	Object.keys(inventory).forEach(iKey => {
		result[iKey] = getStateForSwitch(iKey)
	})
	return result
}

export {gpioState, getState}
