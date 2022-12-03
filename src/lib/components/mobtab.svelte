<script lang="ts">
	export let switb: (to: number) => void;
	export let unread = false;
</script>

<div class="h-fit flex w-full justify-center items-center lg:hidden mt-3">
	<button
		href={''}
		id="mtb0"
		on:click={() => switb(0)}
		class="flex-grow btna rounded border border-black px-3 lg:ml-0 lg:mt-2 lg:w-full text-center transition hover:bg-primary active:scale-95"
		>Image</button
	>
	<button
		href={''}
		id="mtb1"
		on:click={() => switb(1)}
		class="flex-grow flex items-center justify-center rounded border border-black px-3 ml-2 lg:ml-0 lg:mt-2 lg:w-full text-center transition hover:bg-primary active:scale-95"
		>{#if unread} <span class="text-primary mr-1 leading-tight">●</span> {/if}
		Chat</button
	>
	<button
		href={''}
		id="mtb2"
		on:click={() => switb(2)}
		class="flex-grow rounded border border-black px-3 ml-2 lg:ml-0 lg:mt-2 lg:w-full text-center transition hover:bg-primary active:scale-95"
		>LB</button
	>
</div>
