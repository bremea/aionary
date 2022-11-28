<script>
	import Link from '$lib/components/link.svelte';
	import Logo from '$lib/components/logo.svelte';
</script>

<div class="flex w-full h-screen">
	<div class="flex-grow flex flex-col h-full">
		<div class="mbox flex justify-center items-center m-6 mb-0">
			<Logo />
			<div class="flex flex-col ml-8">
				<p>Pictionary, but a robot attempts to draw the picture.</p>
				<p class="text-xs">
					Made with good intentions by <Link
						href="https://bremea.com"
						rel="noreferrer"
						target="_blank">Brett Meadows</Link
					>.
				</p>
			</div>
		</div>
		<div class="flex w-full p-6 h-full">
			<div class="mw w-1/5 mbox h-full flex flex-col">
				<p>Links</p>
				<p class="text-inline">
					<span class="text-xs text-primary underline-none">NEW</span>&nbsp;<Link
						href="https://discord.gg/8uFhTkSyFy"
						target="_blank">Join our Discord</Link
					>
				</p>
				<Link href="https://twitter.com/playaionary" target="_blank">Offical Twitter</Link>
				<Link href="/rules">Rules</Link>
				<Link href="/credits">Credits</Link>
				<Link href="mailto:contact@aionary.com" target="_blank">Contact</Link>
				<br />
				<p>Stats</p>
				<p class="text-xs">0 playing now</p>
				<p class="text-xs">0 images generated</p>
				<div class="flex-grow" />
				<p class="text-xs">
					Copyright &copy; Brett Meadows 2022. The owner of this site is not responsible for any
					user generated content.
				</p>
			</div>
			<div class="flex-grow h-full mx-6 flex flex-col">
				<div class="h-32 mb-6 mbox flex flex-col justify-center items-center">
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5296928207981957"
						crossorigin="anonymous"
					></script>
					<!-- hznt -->
					<ins
						class="adsbygoogle"
						style="display:block"
						data-ad-client="ca-pub-5296928207981957"
						data-ad-slot="3595922703"
						data-ad-format="auto"
						data-full-width-responsive="true"
					/>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({});
					</script>
				</div>
				<div class="mbox flex-grow flex flex-col justify-center">
					<a
						href="/play"
						class="flex items-center justify-center rounded border border-black px-3 py-6 ml-3 text-center transition hover:bg-primary mbtn active:scale-95"
					>
						<img src="/svg/robot.svg" alt="robot" class="robot" height={64} width={64} />
						<div class="flex flex-col items-start ml-3">
							<p>Click here to play</p>
							<p class="text-xs">Join random game</p>
						</div></a
					>
					<p class="text-xs text-center my-6">OR</p>
					<a
						href="/play/new"
						class="flex items-center justify-center rounded border border-black px-3 py-3 ml-3 text-center transition hover:bg-primary mbtn active:scale-95"
					>
						<div class="flex flex-col items-start ml-3">
							<p>New Private Game</p>
						</div></a
					>
				</div>
				<div class="h-32 mt-6 mbox flex flex-col justify-center items-center">
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5296928207981957"
						crossorigin="anonymous"
					></script>
					<!-- hznt -->
					<ins
						class="adsbygoogle"
						style="display:block"
						data-ad-client="ca-pub-5296928207981957"
						data-ad-slot="3595922703"
						data-ad-format="auto"
						data-full-width-responsive="true"
					/>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({});
					</script>
				</div>
			</div>
			<div class="mw w-1/5 mbox h-full flex flex-col">
				<div>
					<p>How to play</p>
					<p class="text-xs">
						The computer will generate an image of a random thing. If you think you know what the
						image shows, type it into the "Guess" box. The quicker you guess, the more points you
						get! More points allows you to move up the leaderboard.
					</p>
				</div>
				<img src="/tutorial.gif" alt="tutorial" class="mt-3 self-center" width={200} />
			</div>
		</div>
	</div>
</div>
