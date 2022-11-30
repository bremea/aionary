<script lang="ts">
	let lb: { [key: string]: { name: string; pos: number; pts: number } } = {};
	let lbTop: string[] = [];
	let pos: number = 0;

	export const setLb = (
		l: { [key: string]: { name: string; pos: number; pts: number } },
		lt: Array<string>,
		ppos: number
	) => {
		lb = l;
		lbTop = lt;
		pos = ppos;
	};

	let show = true;
	export { show };
</script>

<div
	class={`mt-6 mbox !p-3 lg:!p-6 flex-grow flex flex-col items-center ${show ? 'flex' : 'hidden'}`}
>
	<p class="mb-3">Leaderboard</p>
	{#each lbTop as player, i}
		<p class={`text-xs ${i == pos ? 'text-primary' : ''}`}>
			{(lb[player]?.pos || 0) + 1}: <span class="font-bold">{lb[player]?.name}</span> ({lb[player]?.pts} pts)
		</p>
	{/each}
</div>
