import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { env } from '$env/dynamic/private';
import centra from 'centra';

export async function POST({ request }: RequestEvent) {
	const bdata = await request.json();

	const flyreq = centra(`https://${env.FLY_API_HOSTNAME}/v1/apps/aionary-gamews/machines`, 'POST');
	flyreq.header('Authorization', `Bearer ${env.FLY_API_TOKEN}`);
	flyreq.header('Content-Type', 'application/json');
	flyreq.body(
		{
			region: bdata['region'] || 'ewr',
			config: {
				image: 'registry.fly.io/aionary-gamews:latest',
				env: {
					'PUBLIC_GAME': 'false'
				},
				services: [
					{
						ports: [
							{
								port: 80,
								handlers: ['http']
							}
						],
						protocol: 'tcp',
						internal_port: 8080
					}
				]
			}
		},
		'json'
	);
	const flyres = await flyreq.send();
	const flyjson = await flyres.json();

	return json({
		error: false,
		instance: flyjson['id']
	});
}
