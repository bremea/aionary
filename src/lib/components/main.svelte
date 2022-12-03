<script lang="ts">
	import Logo from './logo.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let mainState = 0;
	let innerWidth = 0;
	let percent = 0;
	let reported = false;
	let winners: string[] = [];
	let placement = 0;
	let finalPts = 0;
	let word: string = '';
	let isLoad: boolean = true;
	let loading = ['|', '/', '—', '\\'];
	let lX = 0;
	let status = '';
	let round = 0;
	let correct = false;
	let error: string | undefined = undefined;
	const id = $page.params.game;

	export let isHoliday = false;
	let show = true;
	export { show };

	export const setWord = (w: string, corr: boolean) => {
		if (w == '') {
			isLoad = true;
		} else if (correct == false) {
			isLoad = false;
			word = w;
			correct = corr;
		}
	};

	const rJ = () => {
		join((document.getElementById('nameval') as HTMLInputElement).value);
	};

	export let report: () => Promise<boolean>;
	const sendReport = async () => {
		reported = await report();
	};

	export let join: (name: string) => void;

	export const connStatus = (s: string, e?: string) => {
		status = s;
		error = e;
	};

	const copyurl = () => {
		navigator.clipboard.writeText(document.getElementById('url')!.innerHTML);
		document.getElementById('url')!.innerHTML = 'copied!'
	};

	export const setState = (state: number, newRound?: number) => {
		mainState = state;
		if (newRound) round = newRound;
		if (state == 1) {
			correct = false;
			reported = false;
		}
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
			ctx.drawImage(image, 0, 0, c.width, c.height);
		};
		image.src = img;
		percent = prc;
	};

	onMount(() => {
		const name = window.localStorage.getItem('name');
		if (name) {
			(document.getElementById('nameval') as HTMLInputElement).value = name;
		}
		(document.getElementById('nameval') as HTMLInputElement).focus();
		setInterval(() => {
			lX++;
			if (lX === loading.length) lX = 0;
			if (isLoad) word = `(${loading[lX]})`;
		}, 100);
	});
</script>

<svelte:window bind:innerWidth />
{#if mainState === 0}
	<div
		class={`relative !overflow-hidden mt-4 lg:mt-6 h-fit lg:flex-grow mbox flex-col justify-center items-center ${
			show ? 'flex' : 'hidden'
		}`}
	>
		<div class="">
			<Logo />
			{#if error}
				<p class="mt-3 text-center font-bold"><span class="text-primary">Error!</span> {error}</p>
			{/if}
			{#if status != ''}
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
					Invite: <span
						id="url"
						class="underline text-blue-500 cursor-pointer"
						on:keydown={copyurl}
						on:click={copyurl}>https://aionary.com/play/{id}</span
					>
				</p>
			{/if}
		</div>
		<img
			src={`/svg/${isHoliday ? 'santa' : 'robot'}.svg`}
			alt="robot"
			class="robot hidden lg:block absolute bottom-4 left-4 h-16 w-16 lg:h-24 lg:w-24"
		/>
	</div>
{:else if mainState === 1}
	<div
		class={`relative !overflow-hidden mt-4 lg:mt-6 h-fit lg:flex-grow mbox flex-col justify-center items-center ${
			show ? 'flex' : 'hidden'
		}`}
	>
		<div class="">
			<p class="text-center font-bold">Round {round}</p>
		</div>
		<img
			src={`/svg/${isHoliday ? 'santa' : 'robot'}.svg`}
			alt="robot"
			class="robot absolute bottom-4 left-4 h-8 w-8 lg:h-24 lg:w-24"
		/>
	</div>
{:else if mainState === 2 || mainState === 3}
	<div
		class={`relative !overflow-hidden mt-4 lg:mt-6 h-fit lg:flex-grow mbox flex-col justify-center items-center ${
			show ? 'flex' : 'hidden'
		}`}
	>
		<div class=" flex flex-col items-center">
			<div class="font-bold text-xs md:text-base flex justify-center items-center text-center mb-3">
				{#each word.split('') as letter}
					{#if letter === '_'}
						<p class="px-1">&nbsp;</p>
					{:else}
						<p
							class={`${
								isLoad ? 'text-primary' : correct ? 'text-green-500 underline' : 'underline'
							} px-1`}
						>
							{#if letter === ' '}
								&nbsp;
							{:else}
								{letter}
							{/if}
						</p>
					{/if}
				{/each}
			</div>
			<div class="relative w-32 h-32 lg:w-64 lg:h-64 rounded border overflow-hidden">
				{#if mainState === 3}
					<div
						class="text-white text-xxs md:text-xs bg-black bg-opacity-50 absolute top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center swoop-in"
					>
						{#if winners.length > 0}
							{#if winners[0]}<p class="text-center">
									1: <span class="font-bold">{winners[0]}</span> (+5 pts)
								</p>{/if}
							{#if winners[1]}<p class="text-center">
									2: <span class="font-bold">{winners[1]}</span> (+4 pts)
								</p>{/if}
							{#if winners[2]}<p class="text-center">
									3: <span class="font-bold">{winners[2]}</span> (+3 pts)
								</p>{/if}
							{#if winners[3]}<p class="text-center">
									4: <span class="font-bold">{winners[3]}</span> (+2 pts)
								</p>{/if}
							{#if winners[4]}<p class="text-center">
									5: <span class="font-bold">{winners[4]}</span> (+1 pt)
								</p>{/if}
						{:else}
							<p class="text-xs text-center">No one guessed the word!</p>
						{/if}
					</div>
				{/if}
				<canvas id="canvas" class="bg-black w-full h-full" />
			</div>
			{#if mainState === 2}
				<p class="text-center text-xs mt-3 hidden lg:block">Drawing... {percent}%</p>
			{:else if placement == -1}
				<p class="text-xs mt-3 text-center">You didn't guess the word</p>
			{:else}
				<p class="text-xs mt-3 text-center">You finished #{placement} (+{finalPts} pts)</p>
			{/if}
		</div>

		{#if !reported}
			<img
				src={`/svg/flag.svg`}
				alt="flag"
				on:click={sendReport}
				on:keydown={sendReport}
				class="absolute top-2 right-2 h-8 w-8 cursor-pointer"
			/>
		{:else}
			<img src={`/svg/check.svg`} alt="checkmark" class="absolute top-2 right-2 h-8 w-8" />
		{/if}
		<img
			src={`/svg/${isHoliday ? 'santa' : 'robot'}.svg`}
			alt="robot"
			class="robot absolute bottom-4 left-4 h-8 w-8 lg:h-24 lg:w-24"
		/>
	</div>
{/if}
