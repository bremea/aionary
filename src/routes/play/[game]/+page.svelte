<script lang="ts">
	import { page } from '$app/stores';
	import Main from '$lib/components/main.svelte';
	import Chat from '$lib/components/chat.svelte';
	import Round from '$lib/components/round.svelte';
	import Stats from '$lib/components/stats.svelte';
	import Leaderboard from '$lib/components/leaderboard.svelte';

	const id = $page.params.game;

	let chat: Chat;
	let main: Main;
	let round: Round;
	let stats: Stats;
	let lb: Leaderboard;
	let currentRound: number = 0;
	let guess = () => {
		console.error('WS not init yet');
	};

	const join = (nmva: string) => {
		main.connStatus('Connecting to server');
		if (nmva == '' || !nmva) nmva = 'Guest';
		window.localStorage.setItem('name', nmva);

		const g = new WebSocket(`wss://ws.aionary.com/${id}`);
		g.onopen = () => {
			console.log('Connected to game instance ' + id);
			main.connStatus('Joining game');
			g.send(JSON.stringify({ action: 'join', name: nmva }));
		};

		g.onerror = () => {
			main.connStatus('Error', 'Something went wrong, try again.');
		};

		guess = () => {
			const token = window.localStorage.getItem('token');
			g.send(
				JSON.stringify({
					action: 'chat',
					token: token,
					msg: (document.getElementById('chval') as HTMLInputElement).value
				})
			);
			(document.getElementById('chval') as HTMLInputElement).value = '';
		};

		g.onmessage = (data) => {
			const msg = JSON.parse(data.data.toString());
			switch (msg.action) {
				case 'error': {
					if (msg.ti) {
						g.send(JSON.stringify({ action: 'join', name: nmva }));
					} else {
						console.error('Socket error: ' + msg.msg);
					}
					break;
				}
				case 'token': {
					window.localStorage.setItem('token', msg.token);
					window.localStorage.setItem('uuid', msg.uuid);
					break;
				}
				case 'addPlayer': {
					chat.addMessage(`${msg.name} joined the game!`);
					round.setInfo(currentRound, msg.players);
					break;
				}
				case 'removePlayer': {
					chat.addMessage(`${msg.name} left the game!`);
					round.setInfo(currentRound, msg.players);
					break;
				}
				case 'gameState': {
					main.setState(msg.state);
					currentRound = msg.round;
					if (msg.state == 2) {
						(document.getElementById('chval') as HTMLInputElement).placeholder = 'Your guess...';
						document.getElementById('chbtn')!.innerHTML = 'Guess';
					} else {
						(document.getElementById('chval') as HTMLInputElement).placeholder = 'Chat...';
						(document.getElementById('chbtn') as HTMLButtonElement).disabled = false;
						document.getElementById('chbtn')!.innerHTML = 'Send';
					}
					round.setInfo(currentRound, 1);
					break;
				}
				case 'word': {
					console.log(msg);
					round.setWord(msg.word);
					break;
				}
				case 'winners': {
					const uuid = window.localStorage.getItem('uuid');
					const placement = msg.winnersUUID.indexOf(uuid);
					main.setWinners(msg.winners, placement);
					break;
				}
				case 'leaderboard': {
					const uuid = window.localStorage.getItem('uuid')!;
					const lba = Object.keys(msg.leaderboard).sort(
						(a, b) => msg.leaderboard[a].pos - msg.leaderboard[b].pos
					);
					const mpos = lba.indexOf(uuid);
					stats.updateLb(mpos, msg.leaderboard, uuid);
					lb.setLb(msg.leaderboard, lba);
					break;
				}
				case 'img': {
					main.setImg(msg.img, msg.prc);
					break;
				}
				case 'chat': {
					chat.addMessage(msg.msg, msg.name);
					if (msg.guessed) {
						(document.getElementById('chbtn') as HTMLButtonElement).disabled = true;
						stats.updatePts(msg.pts);
					}
					break;
				}
			}
		};
	};
</script>

<div class="flex w-full h-screen p-6">
	<div class="w-1/5 flex flex-col h-full">
		<Stats bind:this={stats} />
		<Leaderboard bind:this={lb} />
	</div>
	<div class="flex-grow flex flex-col h-full mx-6">
		<Round bind:this={round} />
		<Main bind:this={main} {join} />
		<div class="h-32 mt-6 mbox flex flex-col justify-center items-center">
			<p>Advertisement</p>
		</div>
	</div>
	<div class="w-1/5 flex flex-col h-full">
		<Chat bind:this={chat} />
		<div class="h-32 mt-6 mbox flex flex-col justify-center items-center">
			<input
				type="text"
				class="rounded border border-black px-3 flex-grow text-center w-full"
				placeholder="Your guess..."
				id="chval"
			/>
			<button
				href={''}
				on:click={guess}
				id="chbtn"
				class="rounded border border-black px-3 mt-2 w-full text-center transition hover:bg-primary active:scale-95"
				>Guess</button
			>
		</div>
	</div>
</div>
