<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Snow from '$lib/components/snow.svelte';

	const isHoliday = $page.url.searchParams.has('holiday');

	let loading = ['|', '/', '—', '\\'];
	let lX = 0;
	let status = 'Finding game';
	let error: string | undefined = undefined;

	onMount(async () => {
		setInterval(() => {
			lX++;
			if (lX === loading.length) lX = 0;
		}, 100);

		const rre = await fetch(`https://ws.aionary.com/pub${isHoliday ? '?holiday' : ''}`);
		const res = await rre.text();
		if (/[0-9A-Fa-f]{6}/g.test(res)) {
			goto(`/play/${res}${isHoliday ? '?holiday' : ''}`);
		} else {
			error = 'Something went wrong, try again.';
		}
	});
</script>

<div class="flex w-full h-screen items-center justify-center z-10">
	<div class="mbox h-fit flex flex-col justify-center items-center m-3 xs:m-6 mb-0 z-10">
		<Logo />
		{#if error}
			<p class="mt-3 z-10"><span class="text-primary z-10">Error!</span> {error}</p>
		{:else}
			<p class="mt-3 z-10">{status} <span class="text-primary z-10">({loading[lX]})</span></p>
		{/if}
	</div>
</div>
{#if isHoliday}<Snow />{/if}