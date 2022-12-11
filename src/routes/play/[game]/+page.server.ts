import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { env } from '$env/dynamic/private';
import centra from 'centra';

export async function load({ params }: RequestEvent) {
	const flyreq = centra(
		`https://${env.FLY_API_HOSTNAME}/v1/apps/aionary-gamews/machines/${params.game}`,
		'GET'
	);
	flyreq.header('Authorization', `Bearer ${env.FLY_API_TOKEN}`);
	const res = await (await flyreq.send()).json();

	if (res.error) {
		throw error(404, {
			message: 'Not found'
		});
	} else {
		return;
	}
}
