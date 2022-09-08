import {Gpio} from 'onoff'

const garden = new Gpio(24, 'high')
const pump = new Gpio(23, 'high')

const run = async () => {
	try {
		await garden.write(Gpio.LOW)
	} catch (e) {
		console.error('error', e)
	}

	console.log('done')
}


run()
