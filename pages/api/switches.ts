import readState from "../../nc-1601/readState";
import inventory from "../../inventory";

type SwitchStateRes = {
	name: string
	id: string
	state: boolean
}

const getFullState = async () => {
	const state = await readState(inventory.controller.url)

	const switches: SwitchStateRes[] = []
	Object.keys(inventory.switches).forEach((switchId) => {
		const switchName: string = inventory.switches[switchId as keyof typeof inventory.switches]
		const switchState = state[parseInt(switchId) as keyof typeof state]
		switches.push({
			id: switchId,
			name: switchName,
			state: switchState,
		})
	})
	return switches
}

const handler = async (req, res) => {
	const switches: SwitchStateRes[] = await getFullState()

	res.status(200)
	res.json({
		switches
	})
}

export default handler
