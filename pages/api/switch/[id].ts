// import inventory from "../../../inventory";
import {gpioState} from "../../../gpio";
import {Gpio} from "onoff";

const handle = async (req, res) => {
	console.log('state', gpioState)
	if (req.method === 'PUT') {
		const sw = req.url.params.id
		const state = req.body.state
		if (typeof state !== 'boolean') {
			res.status(400)
			res.send('state must be boolean')
			return
		}

		if (!state) {
			res.status(404)
			res.send(`switch ${sw} does not exist`)
			return
		}

		try {
			gpioState[sw].write(state ? Gpio.HIGH : Gpio.LOW)
		} catch (err) {
			res.status(500)
			res.send(`setting switch ${sw} failed: ${(err as Error).message}`)
			return
		}

		res.status(200)
		res.send('ok')
	} else {
		res.status(400)
		res.send('bad request')
	}
}

export default handle
