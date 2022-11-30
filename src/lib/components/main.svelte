<script lang="ts">
	import Logo from './logo.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let mainState = 0;
	let innerWidth = 0;
	let percent = 0;
	let winners: string[] = [];
	let placement = 0;
	let finalPts = 0;
	let loading = ['|', '/', '—', '\\'];
	let lX = 0;
	let status = '';
	let error: string | undefined = undefined;
	const id = $page.params.game;

	export let isHoliday = false;
	let show = true;
	export { show };

	const rJ = () => {
		join((document.getElementById('nameval') as HTMLInputElement).value);
	};

	export let join: (name: string) => void;

	export const connStatus = (s: string, e?: string) => {
		status = s;
		error = e;
	};

	export const setState = (state: number) => {
		mainState = state;
	};

	export const setWinners = (w: Array<string>, p: number) => {
		winners = w;
		placement = p == -1 ? p : p + 1;
		if (p > -1) {
			finalPts = Math.max(1, 5 - p);
		}
	};

	export const setImg = (img: string, prc: number) => {
		const c = document.getElementById('canvas') as HTMLCanvasElement;
		const ctx = c.getContext('2d')!;
		const image = new Image();
		image.onload = function () {
			ctx.drawImage(image, 0, 0, 256, 256);
		};
		image.src = img;
		percent = prc;
	};

	onMount(() => {
		const name = window.localStorage.getItem('name');
		if (name) {
			(document.getElementById('nameval') as HTMLInputElement).value = name;
		}
		setInterval(() => {
			lX++;
			if (lX === loading.length) lX = 0;
		}, 100);
	});
</script>

<svelte:window bind:innerWidth />
{#if mainState === 0}
	<div
		class={`relative !overflow-hidden mt-6 h-fit lg:flex-grow mbox flex-col justify-center items-center ${
			show ? 'flex' : 'hidden'
		}`}
	>
		<Logo />
		{#if error}
			<p class="mt-3 text-center"><span class="text-primary">Error!</span> {error}</p>
		{:else if status != ''}
			<p class="mt-3 text-center">{status} <span class="text-primary">({loading[lX]})</span></p>
		{:else}
			<p class="my-3 text-center">Enter your name below</p>
			<div class="flex flex-col justify-center items-center">
				<input
					type="text"
					class="rounded border border-black px-3 flex-grow text-center w-full"
					placeholder="Your name..."
					id="nameval"
				/>
				<button
					href={''}
					on:click={rJ}
					id="namebtn"
					class="rounded border border-black px-3 mt-2 w-full text-center transition hover:bg-primary active:scale-95"
					>Play</button
				>
			</div>
			<p class="text-xs mt-3 text-center">
				Game invite: <code>aionary.com/play/{id}</code>
			</p>
		{/if}
		<img
			src={`/svg/${isHoliday ? 'santa' : 'robot'}.svg`}
			alt="robot"
			class="robot absolute bottom-0 left-0 h-16 w-16 md:h-24 md:w-24"
		/>
	</div>
{:else if mainState === 1}
	<div
		class={`relative !overflow-hidden mt-6 h-fit lg:flex-grow mbox flex-col justify-center items-center ${
			show ? 'flex' : 'hidden'
		}`}
	>
		<Logo />
		<p class="text-center">Next round will start soon...</p>
		<img
			src={`/svg/${isHoliday ? 'santa' : 'robot'}.svg`}
			alt="robot"
			class="robot absolute bottom-0 left-0 h-16 w-16 md:h-24 md:w-24"
		/>
	</div>
{:else if mainState === 2}
	<div
		class={`relative !overflow-hidden mt-6 h-fit lg:flex-grow mbox flex-col justify-center items-center ${
			show ? 'flex' : 'hidden'
		}`}
	>
		<canvas id="canvas" class="bg-black rounded border" width="256" height="256" />
		<p class="text-center">Drawing the picture... {percent}%</p>
		<img
			src={`/svg/${isHoliday ? 'santa' : 'robot'}.svg`}
			alt="robot"
			class="robot absolute bottom-0 left-0 h-16 w-16 md:h-24 md:w-24"
		/>
	</div>
{:else if mainState === 3}
	<div
		class={`relative !overflow-hidden mt-6 h-fit lg:flex-grow mbox flex-col justify-center items-center ${
			show ? 'flex' : 'hidden'
		}`}
	>
		<p class="text-xs mb-3">Round Results</p>
		{#if winners.length > 0}
			{#if winners[0]}<p>1: <span class="font-bold">{winners[0]}</span> (+5 pts)</p>{/if}
			{#if winners[1]}<p>2: <span class="font-bold">{winners[1]}</span> (+4 pts)</p>{/if}
			{#if winners[2]}<p>3: <span class="font-bold">{winners[2]}</span> (+3 pts)</p>{/if}
			{#if winners[3]}<p>4: <span class="font-bold">{winners[3]}</span> (+2 pts)</p>{/if}
			{#if winners[4]}<p>5: <span class="font-bold">{winners[4]}</span> (+1 pt)</p>{/if}
		{:else}
			<p>No one guessed the word!</p>
		{/if}
		{#if placement == -1}
			<p class="text-xs mt-3 text-center">You didn't guess the word</p>
		{:else}
			<p class="text-xs mt-3 text-center">You finished #{placement} (+{finalPts} pts)</p>
		{/if}
		<img
			src={`/svg/${isHoliday ? 'santa' : 'robot'}.svg`}
			alt="robot"
			class="robot absolute bottom-0 left-0 h-16 w-16 md:h-24 md:w-24"
		/>
	</div>
{/if}
