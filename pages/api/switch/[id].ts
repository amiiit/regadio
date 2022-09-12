// import inventory from "../../../inventory";
import {gpioState} from "../../../gpio";
import {Gpio} from "onoff";

const handle = async (req, res) => {
	console.log('state', gpioState)
	if (req.method === 'PUT') {
		const sw = req.params.switchId
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

		res.sendStatus(200)
	} else {
		res.sendStatus(400)
	}
}

export default handle
