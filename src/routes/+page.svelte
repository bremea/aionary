<script>
	import Ad from '$lib/components/home/ad.svelte';
	import Howto from '$lib/components/home/howto.svelte';
	import Links from '$lib/components/home/links.svelte';
	import Play from '$lib/components/home/play.svelte';
	import Link from '$lib/components/link.svelte';
	import Logo from '$lib/components/logo.svelte';
</script>

<div class="flex w-full">
	<div class="flex-grow flex flex-col h-full">
		<div class="mbox h-fit flex justify-center flex-col items-center flex-grow m-6 mb-0 !overflow-hidden md:flex-row">
			<Logo />
			<div class="flex flex-col ml-8">
				<p class="text-center sm:text-left">Pictionary, but a robot attempts to draw the picture.</p>
				<p class="text-xs text-center sm:text-left">
					Made with good intentions by <Link
						href="https://twitter.com/brett_8975"
						rel="noreferrer"
						target="_blank">Brett Meadows</Link
					>.
				</p>
			</div>
		</div>
		<div class="flex w-full p-6 h-auto lg:flex-row flex-col">
			<Links show={true} />
			<div class="flex-grow m-0 lg:mx-6 flex flex-col">
				<Play />
				<Ad />
			</div>
			<Howto />
			<Links show={false} />
		</div>
	</div>
</div>
