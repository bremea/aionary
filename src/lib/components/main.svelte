<script lang="ts">
	import Logo from './logo.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let mainState = 0;
	let percent = 0;
	let winners: string[] = [];
	let placement = 0;
	let finalPts = 0;
	let loading = ['|', '/', '—', '\\'];
	let lX = 0;
	let status = '';
	let error: string | undefined = undefined;
	const id = $page.params.game;

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
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d')!;
		const image = new Image();
		image.onload = function () {
			ctx.drawImage(image, 0, 0, 256, 256);
		};
		image.src = img;
		percent = prc;
	};

	onMount(() => {
		setInterval(() => {
			lX++;
			if (lX === loading.length) lX = 0;
		}, 100);
	});
</script>

{#if mainState === 0}
	<div
		class="relative !overflow-hidden mt-6 flex-grow mbox flex flex-col justify-center items-center"
	>
		<Logo />
		{#if error}
			<p class="mt-3"><span class="text-primary">Error!</span> {error}</p>
		{:else if status != ''}
			<p class="mt-3">{status} <span class="text-primary">({loading[lX]})</span></p>
		{:else}
			<p class="my-3">Enter your name below</p>
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
			<p class="text-xs mt-3">Joining {id}</p>
		{/if}
	</div>
{:else if mainState === 1}
	<div
		class="relative !overflow-hidden mt-6 flex-grow mbox flex flex-col justify-center items-center"
	>
		<Logo />
		<p>Next round will start soon...</p>
		<img
			src="/svg/think.svg"
			height={100}
			width={100}
			alt="robot"
			class="robot absolute bottom-0 left-0"
		/>
	</div>
{:else if mainState === 2}
	<div
		class="relative !overflow-hidden mt-6 flex-grow mbox flex flex-col justify-center items-center"
	>
		<canvas height={256} width={256} id="canvas" />
		<p>Drawing the picture... {percent}%</p>
		<img
			src="/svg/paint.svg"
			height={100}
			width={100}
			alt="robot"
			class="robot absolute bottom-0 left-0"
		/>
	</div>
{:else if mainState === 3}
	<div
		class="relative !overflow-hidden mt-6 flex-grow mbox flex flex-col justify-center items-center"
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
			<p class="text-xs mt-3">You didn't guess the word</p>
		{:else}
			<p class="text-xs mt-3">You finished #{placement} (+{finalPts} pts)</p>
		{/if}
		<img
			src="/svg/celebrate.svg"
			height={100}
			width={100}
			alt="robot"
			class="robot absolute bottom-0 left-0"
		/>
	</div>
{/if}
