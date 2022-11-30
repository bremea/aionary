<script lang="ts">
	export let switb: (to: number) => void;
</script>

<div class="h-fit !py-3 mbox flex justify-center items-center lg:hidden mt-6">
	<button
		href={''}
		id="mtb0"
		on:click={() => switb(0)}
		class="btna rounded border border-black px-3 ml-2 lg:ml-0 lg:mt-2 lg:w-full text-center transition hover:bg-primary active:scale-95"
		>Image</button
	>
	<button
		href={''}
		id="mtb1"
		on:click={() => switb(1)}
		class="rounded border border-black px-3 ml-2 lg:ml-0 lg:mt-2 lg:w-full text-center transition hover:bg-primary active:scale-95"
		>Chat</button
	>
	<button
		href={''}
		id="mtb2"
		on:click={() => switb(2)}
		class="rounded border border-black px-3 ml-2 lg:ml-0 lg:mt-2 lg:w-full text-center transition hover:bg-primary active:scale-95"
		>Leaderboard</button
	>
</div>
