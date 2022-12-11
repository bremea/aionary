<script lang="ts">
	import { goto } from '$app/navigation';
	import Ad from '$lib/components/home/ad.svelte';
	import Lightlogo from '$lib/components/home/lightlogo.svelte';
	import Link from '$lib/components/link.svelte';
	import Loading from '$lib/components/loading.svelte';
	import { onMount } from 'svelte';

	let isLoading = true;
	let me:
		| {
				id: string;
				discriminator: number;
				name: string;
				points: string;
				discord_username: string;
		  }
		| undefined;

	onMount(async () => {
		const token = window.localStorage.getItem('lightning');
		if (!token) {
			goto('/lightning/login');
		}

		const res = await (
			await fetch('https://ws.aionary.com/lightning/me', { headers: { Authorization: token! } })
		).json();

		if (res.error) {
			goto('/lightning/login');
		} else {
			me = res.data;
			isLoading = false;
		}
	});
</script>

<div class="p-6 flex min-h-screen w-full">
	<div class="mbox w-1/5 mw" />
	<div class="mx-6 flex flex-col flex-grow">
		<div class="mbox"><Lightlogo /></div>
		<div class="mbox mt-6 flex-grow flex items-center justify-center">
			{#if isLoading}
				<Loading />
			{/if}
		</div>
		<Ad />
	</div>
	<div class="mbox w-1/5 mw">
		{#if me}
			<p>Hey {me.name}!</p>
			<p class="text-xs">
				{me.discord_username}#{me.discriminator} (<Link href="/lightning/login">Logout</Link>)
			</p>
			<p class="mt-3"><span class="text-primary">{me.points}</span> pts</p>
		{/if}
	</div>
</div>
