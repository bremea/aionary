<script lang="ts">
	import { onMount } from 'svelte';

	let round: number = 0;
	let totalPlaying: number = 1;
	let word: string = '';
	let isLoad: boolean = true;
	let loading = ['|', '/', '—', '\\'];
	let lX = 0;

	export const setInfo = (r: number, tp: number) => {
		round = r;
		totalPlaying = tp;
	};

	export const setWord = (w: string) => {
		if (w == '') {
			isLoad = true;
		} else {
			isLoad = false;
			word = w;
		}
	};

	onMount(() => {
		setInterval(() => {
			lX++;
			if (lX === loading.length) lX = 0;
			if (isLoad) word = `(${loading[lX]})`;
		}, 100);
	});
</script>

<div class="h-32 mbox flex flex-col justify-center items-center">
	<div class="flex items-center">
		{#each word.split('') as letter}
			<p class={`${isLoad ? 'text-primary' : 'underline'} px-1`}>
				{#if letter === ' '}
					&nbsp;
				{:else}
					{letter}
				{/if}
			</p>
		{/each}
	</div>
	<p class="text-xs">Round {round} - {totalPlaying} playing - aionary.com</p>
</div>
