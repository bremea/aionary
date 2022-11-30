<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let loading = ['|', '/', '—', '\\'];
	let lX = 0;
	let status = 'Finding game';
	let error: string | undefined = undefined;

	onMount(async () => {
		setInterval(() => {
			lX++;
			if (lX === loading.length) lX = 0;
		}, 100);

		const rre = await fetch('https://ws.aionary.com/pub');
		const res = await rre.text();
		if (/[0-9A-Fa-f]{6}/g.test(res)) {
			goto(`/play/${res}`);
		} else {
			error = 'Something went wrong, try again.';
		}
	});
</script>

<div class="flex w-full h-screen items-center justify-center">
	<div class="mbox h-fit flex flex-col justify-center items-center m-3 xs:m-6 mb-0">
		<Logo />
		{#if error}
			<p class="mt-3"><span class="text-primary">Error!</span> {error}</p>
		{:else}
			<p class="mt-3">{status} <span class="text-primary">({loading[lX]})</span></p>
		{/if}
	</div>
</div>
