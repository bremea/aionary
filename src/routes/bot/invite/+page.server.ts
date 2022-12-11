import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(
		302,
		'https://discord.com/api/oauth2/authorize?client_id=1046604658875056220&permissions=313344&scope=bot%20applications.commands'
	);
}
