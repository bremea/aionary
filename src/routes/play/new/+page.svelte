<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { goto } from '$app/navigation';
	import Link from '$lib/components/link.svelte';

	let error: string | undefined = undefined;
	let processing = false;
	let selected: string = 'ewr';

	const regions: { [key: string]: string } = {
		ewr: 'Secaucus, NJ (US)',
		ams: 'Amsterdam, Netherlands',
		cdg: 'Paris, France',
		den: 'Denver, Colorado (US)',
		dfw: 'Dallas, Texas (US)',
		fra: 'Frankfurt, Germany',
		gru: 'São Paulo',
		hkg: 'Hong Kong, Hong Kong',
		iad: 'Ashburn, Virginia (US)',
		jnb: 'Johannesburg, South Africa',
		lax: 'Los Angeles, California (US)',
		lhr: 'London, United Kingdom',
		maa: 'Chennai (Madras), India',
		mad: 'Madrid, Spain',
		mia: 'Miami, Florida (US)',
		nrt: 'Tokyo, Japan',
		ord: 'Chicago, Illinois (US)',
		otp: 'Bucharest, Romania',
		scl: 'Santiago, Chile',
		sea: 'Seattle, Washington (US)',
		sin: 'Singapore',
		sjc: 'Sunnyvale, California (US)',
		syd: 'Sydney, Australia',
		waw: 'Warsaw, Poland',
		yul: 'Montreal, Canada',
		yyz: 'Toronto, Canada'
	};

	const newgame = async () => {
		processing = true;
		const req = await fetch('/api/game/new', {
			method: 'POST',
			body: JSON.stringify({ region: selected })
		});
		const res = await req.json();
		if (res.error) {
			error = 'Something went wrong, try again.';
		} else {
			goto(`/play/${res.instance}`);
		}
	};
</script>

<div class="flex w-full h-screen items-center justify-center">
	<div class="mbox h-fit flex flex-col justify-center items-center m-3 xs:m-6 mb-0">
		<p class="text-center text-xs mb-3"><Link href="/">Go Back</Link></p>
		<Logo />
		<p class="mt-3">New private game</p>
		<p class="text-xs">
			Private games are only accessible with the game's unique URL.<br />The "Join random game"
			button will not send players to this room.
		</p>
		<p class="text-xs mt-3">Pick a city closest to you and others who will be playing.</p>
		{#if error}
			<p class="my-3"><span class="text-primary">Error!</span> {error}</p>
		{/if}
		<form on:submit|preventDefault={newgame} class="mt-3">
			<select class="py-1 px-3 text-xs border border-black rounded" bind:value={selected}>
				{#each Object.keys(regions) as reg}
					<option value={reg}>{regions[reg]}</option>
				{/each}
			</select>
			<button
				href={''}
				disabled={processing}
				type="submit"
				class="rounded border text-xs py-[5px] border-black px-3 text-center transition hover:bg-primary active:scale-95"
				>Play</button
			>
		</form>
	</div>
</div>
