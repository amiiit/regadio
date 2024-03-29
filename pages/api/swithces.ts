import type { NextApiRequest, NextApiResponse } from 'next'
import {getState, gpioState} from "../../gpio";

const switches = (req: NextApiRequest, res: NextApiResponse) => {
	console.log('switches method', req.method)
	if (req.method === 'GET') {
		console.log('get switches')
		const state = getState()
		res.status(200)
		res.send(state)
	}
}

export default switches
