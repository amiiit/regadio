import inventory from "../../inventory";
import {state} from "../../gpio";

const handler = async (req, res) => {
	const result = {}
	res.status(200)
	res.json({
		switches
	})
}

export default handler
