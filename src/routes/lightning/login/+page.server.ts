import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { env } from '$env/dynamic/private';
import centra from 'centra';

export async function load({ url }: RequestEvent) {
	const code = url.searchParams.get('code');
	if (!code) {
		return;
	}

	const flyreq = centra(`https://${env.FLY_API_HOSTNAME}/lightning/account`, 'POST');
	flyreq.body({ token: code, prod: process.env.VERCEL == 'true' }, 'json');
	const res = await (await flyreq.send()).json();
	if (res.token) {
		const setToken = res.token;
		return { setToken };
	} else {
		throw error(500, {
			message: 'Internal error'
		});
	}
}
