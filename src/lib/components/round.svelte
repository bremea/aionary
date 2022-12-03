<script lang="ts">
	import { onMount } from 'svelte';
	import Mobtab from './mobtab.svelte';

	export let switb: (to: number) => void;

	let round: number = 0;
	let totalPlaying: number = 1;
	let loading = ['|', '/', '—', '\\'];
	let lX = 0;
	let chatUnread = false;

	export let isHoliday = false;

	export const pingChat = () => {
		if (!chatUnread) chatUnread = true;
	}

	export const setInfo = (r: number, tp: number) => {
		round = r;
		totalPlaying = tp;
	};

	onMount(() => {
		setInterval(() => {
			lX++;
			if (lX === loading.length) lX = 0;
		}, 100);
	});
</script>

<div class="h-fit !py-3 lg:!py-6 lg:h-32 mbox flex flex-col justify-center items-center">
	<p class="text-center">Round {round}</p>
	<p class="text-xs text-center">
		{totalPlaying} playing - {isHoliday ? 'Holiday' : 'Classic'} mode
	</p>
	<Mobtab switb={switb} unread={chatUnread} />
</div>
