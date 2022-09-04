import inventory from "../../../inventory";
import {set} from "../../../nc-1601/set";

const handle = async (req, res) => {
	if (req.method === 'PUT') {
		const sw = req.params.switchId
		const state = req.body.state
		if (typeof state !== 'boolean') {
			res.status(400)
			res.send('state must be boolean')
			return
		}

		if (!inventory.switches[sw as keyof typeof inventory.switches]) {
			res.status(404)
			res.send(`switch ${sw} does not exist`)
			return
		}

		try {
			await set(inventory.controller.url, parseInt(sw), state)
		} catch (err) {
			res.status(500)
			res.send(`setting switch ${sw} failed: ${(err as Error).message}`)
			return
		}

		res.sendStatus(200)
	} else {
		res.status(400).text('method not supported')
	}
}

export default handle
