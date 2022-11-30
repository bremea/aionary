<div class="mbox flex-grow flex flex-col justify-center">
	<div class="flex items-center justify-center w-full flex-col md:flex-row">
		<a
			href="/play"
			class="flex-grow w-full flex items-center justify-center rounded border border-black px-3 py-6 md:mr-6 text-center transition hover:bg-primary mbtn active:scale-95"
		>
			<img src="/svg/robot.svg" alt="robot" class="robot" height={64} width={64} />
			<div class="flex flex-col items-start ml-3">
				<p>Click here to play</p>
				<p class="text-xs">Join random game</p>
			</div></a
		>
		<p class="text-xs text-center py-3 md:py-0">OR</p>
		<a
			href="/play?holiday"
			class="flex-grow w-full flex items-center justify-center rounded border border-primary px-3 py-6 md:ml-6 text-center transition hover:bg-blue-400 hover:border-black mbtn active:scale-95"
		>
			<img src="/svg/santa.svg" alt="santa" class="robot" height={64} width={64} />
			<div class="flex flex-col items-start ml-3">
				<p><span class="text-xs text-primary underline-none">NEW</span> Holiday Words</p>
				<p class="text-xs">Limited-time game mode</p>
			</div></a
		>
	</div>
</div>
<div class="mbox flex flex-col justify-center text-center mt-6">
	<p class="mb-6 text-xs">
		Private games are custom AIonary games that are invite-only and use a unique URL. They are great
		for hosting games with friends or testing out expiremental features.
	</p>
	<a
		href="/play/new"
		class="flex items-center justify-center rounded border border-black px-3 py-1 text-center transition hover:bg-primary mbtn active:scale-95"
	>
		<div class="flex flex-col items-start ml-3">
			<p class="text-xs">Create Private Game</p>
		</div></a
	>
</div>
