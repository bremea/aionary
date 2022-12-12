<script>
	import Link from '$lib/components/link.svelte';

	import Logo from '$lib/components/logo.svelte';
</script>

<div class="flex py-6 min-h-screen items-center justify-center w-full">
	<div class="flex flex-col p-1 sm:p-6 h-full items-center justify-center w-full lg:w-2/3">
		<div class="flex w-full items-center justify-center">
			<div class="w-full mbox h-fit flex flex-col justify-center items-center m-3 xs:m-6 mb-0">
				<p class="text-center text-xs mb-3"><Link href="/">Main Site</Link></p>
				<Logo maxSize={6} />
				<p class="mt-3">Presskit</p>
				<p class="text-xs">Hello! This page contains everything you need to know about AIonary.</p>
			</div>
		</div>
		<div
			class="flex w-full justify-center items-stretch mt-3 h-full flex-col md:flex-row pr-6 md:pr-0"
		>
			<div class="mbox w-full flex flex-col justify-center m-3 xs:m-6 mb-0">
				<p>About</p>
				<p class="text-xs">
					Gather your friends and try to guess what the computer is (trying to) draw! In this
					multiplayer party game, an AI will generate an image, and you have to be the first to
					guess what it is. Play online with strangers, in a private game with friends, or in a
					Discord server with a bot!
				</p>
				<p class="mt-3">History</p>
				<p class="text-xs">
					AIonary was created by <Link href="https://bremea.com" target="_blank">Brett Meadows</Link
					>. I'm a 16 year-old developer living in Annapolis, Maryland. As AI art became more and
					more popular, I began thinking of different ways of utilizing it in a game. I was inspired
					by the rise of online social games such as Gartic Phone, skribbl.io, and the Jackbox Party
					Pack.<br /><br />The game was developed in just three days and released in late November
					2022. More features were quickly added, including the chat, private games, limited time
					gamemodes, a Discord bot, and more.
				</p>
				<p class="mt-3">Assets</p>
				<p class="text-xs">All available assets are downloadable as .zip files & listed below.</p>
				<ul class="text-xs list-disc pl-3">
					<li>
						<Link href="/press-assets/AIonary_Logos.zip" target="_blank">Logos and Icons</Link> (206
						KB)
					</li>
					<li>
						<Link href="/press-assets/AIonary_Screenshots.zip" target="_blank">Screenshots</Link> (6.3
						MB)
					</li>
				</ul>
			</div>
			<div class="mbox flex flex-col justify-start m-3 xs:m-6 mb-0 w-full md:w-fit mt-6 md:mt-3">
				<p>Release Date</p>
				<p class="text-xs">17 November 2022</p>
				<p class="mt-3">Developer</p>
				<p class="text-xs">
					<Link href="https://bremea.com" target="_blank">Brett Meadows</Link> (I'm 16 and live in Annapolis,
					Maryland)
				</p>
				<p class="mt-3">Website</p>
				<p class="text-xs"><Link href="https://aionary.com" target="_blank">aionary.com</Link></p>
				<p class="mt-3">Platforms</p>
				<p class="text-xs">
					Playable for <span class="font-bold">free</span> online (<Link href="https://aionary.com" target="_blank">aionary.com</Link>) or <Link
						href="/bot"
						target="_blank">in Discord</Link
					>
				</p>
				<p class="mt-3">Contact</p>
				<p class="text-xs">
					<Link href="mailto:press@aionary.com" target="_blank">press@aionary.com</Link> (Press inquiries
					only please)
				</p>
			</div>
		</div>
	</div>
</div>
