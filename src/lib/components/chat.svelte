<script lang="ts">
	import { afterUpdate } from 'svelte';
	import Msg from './chat/msg.svelte';
	import Sys from './chat/sys.svelte';

	let chatBox: HTMLDivElement;
	let messages: Array<{ content: string; player?: string }> = [];
	let show = true;

	export const addMessage = (content: string, player?: string) => {
		messages.push({ content: content, player: player });
		messages = messages;
	};
	export { show };

	afterUpdate(() => {
		chatBox.scroll({ top: chatBox.scrollHeight, behavior: 'smooth' });
	});
</script>

<div
	class={`mbox !p-0 mt-6 lg:mt-0 flex-grow ${show ? 'flex' : 'hidden'} lg:flex flex-1 flex-col items-center`}
	bind:this={chatBox}
>
	<p class="mt-3 lg:mt-6 mb-3">Chat</p>
	<div class="flex flex-grow flex-col w-full striped" id="chat">
		{#each messages as message}
			{#if message.player}
				<Msg content={message.content} player={message.player} />
			{:else}
				<Sys content={message.content} />
			{/if}
		{/each}
	</div>
</div>
