import type { NextApiRequest, NextApiResponse } from 'next'
import {getState, gpioState} from "../../gpio";

const switches = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {

		const state = getState()
		res.status(200)
		res.send(state)
	}
}

export default switches
