import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserState} from "../../gpio";

interface SwitchState {
	name: string
	lowLevelValue: number
	userState: 'on' | 'off'
	gpio: number
}

interface SwitchesResponse {
	[name: string]: SwitchState
}

export const useSwitches = () => {
	return useQuery<SwitchesResponse>(['switches'], async () => {
		const res = await fetch('/api/swithces')
		return res.json()
	})
}

type UserSetSwitchVariables = {
	name: string
	state: UserState
}
export const useSetSwitch = () => {
	const client = useQueryClient()

	return useMutation<SwitchState, Error, UserSetSwitchVariables>([], (variables) => {
		return fetch(`/api/switch/${variables.name}`, {
			method: 'put',
			body: JSON.stringify({
				state: variables.state
			})
		})
	}, {
		onSuccess: (data, variables, context) => {
			client.invalidateQueries(['switches'])
		}
	})
}
