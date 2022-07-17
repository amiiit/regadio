import {createServer} from '@graphql-yoga/node'
import readState from 'rgd-n1601/readState'
import {set} from "rgd-n1601/set";

const server = createServer({
    schema: {
        typeDefs: /* GraphQL */ `
            type SwitchState {
                switch: Int!
                state: Boolean!
            }
            type Query {
                hello: String
                states: [SwitchState!]!
                #                state(switch: Int): SwitchState
            }
            type Mutation {
                set(switch: Int, state: Boolean!): SwitchState
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello from Yoga!',
                states: async () => {
                    const states = await readState("http://192.168.1.4/30000")
                    console.log('states', states)
                    const result = Object.keys(states).map((switchNumber) => ({
                        switch: switchNumber,
                        state: states[switchNumber as any as number]
                    }))
                    console.log(result)
                    return result
                }
            },
            Mutation: {
                set: async (source, args, context, info) => {
                    console.log('args', args)
                    return await set("http://192.168.1.4/30000", args.switch, args.state)
                }
            }
        },
    },
})

server.start()
