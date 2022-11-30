<script lang="ts">
	let lb: { [key: string]: { name: string; pos: number; pts: number } } = {};
	let lbTop: string[] = [];

	export const setLb = (
		l: { [key: string]: { name: string; pos: number; pts: number } },
		lt: Array<string>
	) => {
		lb = l;
		lbTop = lt;
		console.log(lb);
	};

	let show = true;
	export {show};
</script>

<div class={`mt-6 mbox !p-3 lg:!p-6 flex-grow flex flex-col items-center ${show ? 'flex' : 'hidden'}`}>
	<p class="mb-3">Leaderboard</p>
	{#each lbTop as player}
		<p class="text-xs">{lb[player].pos + 1}: <span class="font-bold">{lb[player].name}</span> ({lb[player].pts} pts)</p>
	{/each}
</div>
