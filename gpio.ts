import {Gpio} from 'onoff'

console.log('creating Gpio instances')
const garden = new Gpio(24, 'high')
const pump = new Gpio(23, 'high')
console.log('created.')

const run = async () => {
	try {
		console.log('setting gerden to low')
		await garden.activeLow()
		console.log('set')

	} catch (e) {
		console.error('error', e)
	}

	console.log('done')
}


run()
