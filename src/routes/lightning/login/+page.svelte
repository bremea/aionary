<script>
	import Link from '$lib/components/link.svelte';
	import Lightlogo from '$lib/components/home/lightlogo.svelte';
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let loading = false;

	let redir =
		'https://discord.com/api/oauth2/authorize?client_id=1046604658875056220&redirect_uri=https%3A%2F%2Faionary.com%2Flightning%2Flogin&response_type=code&scope=identify%20email%20guilds.join&prompt=none';
	if (dev) {
		redir =
			'https://discord.com/api/oauth2/authorize?client_id=1046604658875056220&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flightning%2Flogin&response_type=code&scope=identify%20email%20guilds.join&prompt=none';
	}

	if ($page.data.setToken) {
		loading = true;
	}

	onMount(() => {
		if ($page.data.setToken) {
			window.localStorage.setItem('lightning', $page.data.setToken);
			goto('/lightning');
		} else {
			window.localStorage.removeItem('lightning');
		}
	});
</script>

<div class="flex w-full h-screen items-center justify-center">
	<div class="mbox h-fit flex flex-col justify-center items-center m-3 xs:m-6 mb-0">
		<p class="text-center text-xs"><Link href="/">Go Back</Link></p>
		<Lightlogo maxSize={6} />
		{#if loading}
			<p class="mt-3 text-center">Redirecting you...</p>
			<p class="text-xs text-center">
				If this takes longer than 10 seconds, please refresh the page.
			</p>
		{:else}
			<p class="mt-3">You need to login to play</p>
			<a
				href={redir}
				class="rounded mbtn-mini active:scale-95 transition flex items-center px-6 py-1 text-white bg-[#5865F2] mt-3"
			>
				<img src="/misc/discordwhite.svg" class="h-4 mr-3" alt="discord" />
				<p>Login with Discord</p></a
			>
		{/if}
	</div>
</div>
