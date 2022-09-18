import {getStateForSwitch, gpioState, setUserStateForSwitch, UserState} from "../../../gpio";
import {Gpio} from "onoff";
import {NextApiRequest, NextApiResponse} from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('state', gpioState)
	if (req.method === 'PUT') {
		const sw = req.query.id as string
		console.log('req.body', req.body)

		const body = JSON.parse(req.body)
		const stateToSet = body.state as UserState

		if (['on', 'off'].includes(stateToSet)) {
			res.status(400)
			res.send(`state must be either 'on' or 'off'`)
			return
		}

		const currentSwitchState = getStateForSwitch(sw)
		if (!currentSwitchState) {
			console.log(`requested switch '${sw}' does not exist`)
			res.status(404)
			res.send(`switch ${sw} does not exist`)
			return
		}

		let result
		try {
			console.log(`will set ${sw} to ${stateToSet}`)
			result = setUserStateForSwitch(sw, stateToSet)
		} catch (err) {
			res.status(500)
			res.send(`setting switch ${sw} failed: ${(err as Error).message}`)
			return
		}

		res.status(200)
		res.send(result)
	} else {
		res.status(400)
		res.send('bad request')
	}
}

export default handle
