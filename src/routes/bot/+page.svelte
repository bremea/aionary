<script>
	import Link from '$lib/components/link.svelte';

	import Logo from '$lib/components/logo.svelte';
</script>

<div class="flex w-full h-screen items-center justify-center">
	<div class="mbox h-fit flex flex-col justify-center items-center m-3 xs:m-6 mb-0">
		<p class="text-center text-xs mb-3"><Link href="/">Main Site</Link></p>
		<Logo maxSize={6} />
		<p class="mt-3">Offical Discord bot</p>
		<p class="text-xs mb-3">Play Pictionary with an AI right in Discord.</p>
		<video src="/bot.mov" controls autoplay height={300} width={300} class="rounded"
			><track kind="captions" /></video
		>
		<p class="text-xs mt-3">Add the bot below and play by typing /play</p>
		<a
			href="/bot/invite"
			target="_blank"
			rel="noreferrer"
			class="mt-3 flex-grow w-full flex items-center justify-center rounded border border-black px-3 py-3 text-center transition hover:bg-red-400 mbtn active:scale-95"
		>
			<img src="/svg/robot.svg" alt="robot" class="robot" height={48} width={48} />
			<div class="flex flex-col items-start ml-3 md:ml-6">
				<p>Click here to add the bot</p>
			</div></a
		>
	</div>
</div>
