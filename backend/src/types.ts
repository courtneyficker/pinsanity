import { RouteShorthandOptions } from "fastify";
import { User } from "./db/models/user";

// *** USERS ***
export interface IPostUsersBody {
	name: string,
	email: string,
}

export const post_users_opts: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                email: {type: 'string'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    user: {type: 'object'},
                    ip_address: {type: 'string'}
                }
            }
        }
    }
};

/**
 * Response type for post/users
 */
export type IPostUsersResponse = {
	/**
	 * User created by request
	 */
	user: User,
	/**
	 * IP Address user used to create account
	 */
	ip_address: string
}

// ***  ***
