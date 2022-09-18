import React from 'react';
import {useSwitches} from "./hooks";

interface Switch {

}

interface Props {
	switches: Switch
}

const Switches = () => {
	const switches = useSwitches()

	return <div>
		{
			switches.data && (Object.keys(switches.data) || []).map(switchKey => {
				const sw = switches.data[switchKey]

				return (
					<div key={switchKey} style={{
						border: '1px solid grey',
						marginBottom: 16,
						padding: 8,
						cursor: 'pointer',
						background: sw.userState === 'on' ? 'green' : 'grey'
					}}>
						<p>{sw.name}</p>
						<p>{sw.userState}</p>
						<small>{sw.gpio} - {sw.lowLevelValue}</small>
					</div>
				)

			})
		}
	</div>
}

export default Switches
