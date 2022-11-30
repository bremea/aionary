<script lang="ts">
	import { page } from '$app/stores';
	import Main from '$lib/components/main.svelte';
	import Chat from '$lib/components/chat.svelte';
	import Round from '$lib/components/round.svelte';
	import Homelink from '$lib/components/homelink.svelte';
	import Leaderboard from '$lib/components/leaderboard.svelte';
	import Ad from '$lib/components/home/ad.svelte';
	import Mobtab from '$lib/components/mobtab.svelte';
	import { onMount } from 'svelte';
	import Snow from '$lib/components/snow.svelte';

	const id = $page.params.game;

	let chat: Chat;
	let innerWidth = 0;
	let chatmsg: string = '';
	let main: Main;
	let round: Round;
	let lb: Leaderboard;
	let currentRound: number = 0;
	let guess = () => {
		console.error('WS not init yet');
	};

	let isHoliday = $page.url.searchParams.has('holiday');

	let chatShow = false;
	let lbShow = false;

	const join = (nmva: string) => {
		main.connStatus!('Connecting to server');
		if (nmva == '' || !nmva) nmva = 'Guest';
		window.localStorage.setItem('name', nmva);

		const g = new WebSocket(`wss://ws.aionary.com/${id}`);
		g.onopen = () => {
			console.log('Connected to game instance ' + id);
			main.connStatus!('Joining game');
			g.send(JSON.stringify({ action: 'join', name: nmva }));
		};

		g.onerror = () => {
			main.connStatus!('Error', 'Something went wrong, try again.');
		};

		guess = () => {
			const token = window.localStorage.getItem('token');
			console.log(chatmsg);
			g.send(
				JSON.stringify({
					action: 'chat',
					token: token,
					msg: chatmsg || ''
				})
			);
			chatmsg = '';
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
					chat.addMessage!(`${msg.name} joined the game!`);
					round.setInfo!(currentRound, msg.players);
					break;
				}
				case 'removePlayer': {
					chat.addMessage!(`${msg.name} left the game!`);
					round.setInfo!(currentRound, msg.players);
					break;
				}
				case 'gameState': {
					main.setState!(msg.state);
					currentRound = msg.round;
					if (msg.state == 2) {
						(document.getElementById('chval') as HTMLInputElement).placeholder = 'Your guess...';
						document.getElementById('chbtn')!.innerHTML = 'Guess';
					} else {
						(document.getElementById('chval') as HTMLInputElement).placeholder = 'Chat...';
						(document.getElementById('chbtn') as HTMLButtonElement).disabled = false;
						document.getElementById('chbtn')!.innerHTML = 'Send';
					}
					round.setInfo!(currentRound, 1);
					break;
				}
				case 'word': {
					round.setWord!(msg.word);
					break;
				}
				case 'winners': {
					const uuid = window.localStorage.getItem('uuid');
					const placement = msg.winnersUUID.indexOf(uuid);
					main.setWinners!(msg.winners, placement);
					break;
				}
				case 'leaderboard': {
					const uuid = window.localStorage.getItem('uuid')!;
					const lba = Object.keys(msg.leaderboard).sort(
						(a, b) => msg.leaderboard[a].pos - msg.leaderboard[b].pos
					);
					const mpos = lba.indexOf(uuid);
					lb.setLb!(msg.leaderboard, lba, mpos);
					round.setInfo!(currentRound, lba.length);
					break;
				}
				case 'img': {
					main.setImg!(msg.img, msg.prc);
					break;
				}
				case 'chat': {
					chat.addMessage!(msg.msg, msg.name);
					if (msg.guessed) {
						(document.getElementById('chbtn') as HTMLButtonElement).disabled = true;
					}
					break;
				}
				case 'confirmConnection': {
					if (msg.holiday) {
						isHoliday = msg.holiday;
					}
					break;
				}
			}
		};
	};

	onMount(() => {
		chatShow = innerWidth >= 1024;
		lbShow = innerWidth >= 1024;
	});

	const swtab = (to: number) => {
		const elems = document.querySelectorAll('.btna');
		for (const el of elems) {
			el.classList.remove('btna');
		}
		document.getElementById(`btn${to}`)?.classList.add('btna');

		switch (to) {
			case 0: {
				chatShow = false;
				lbShow = false;
				break;
			}
			case 1: {
				chatShow = true;
				lbShow = false;
				break;
			}
			case 2: {
				chatShow = false;
				lbShow = true;
				break;
			}
		}
	};
</script>

<svelte:window bind:innerWidth />
<div class="flex flex-col lg:flex-row w-full h-screen p-3 lg:p-6 [&>*]:z-10">
	<div class="lg:w-1/5 flex-col lg:h-full flex">
		<Homelink />
		{#if innerWidth >= 1024}
			<Leaderboard bind:this={lb} show={true} />
		{/if}
	</div>

	<div class="lg:flex-grow flex flex-col lg:h-full lg:mx-6">
		<Round bind:this={round} {isHoliday} />
		<Mobtab switb={swtab} />
		{#if innerWidth < 1024}
			<div class="flex-col flex">
				<Leaderboard bind:this={lb} show={lbShow} />
			</div>
		{/if}
		<Main {isHoliday} bind:this={main} {join} show={!((chatShow || lbShow) && innerWidth < 1024)} />
		{#if innerWidth >= 1024}
			<Ad />
		{/if}
	</div>
	<div class="lg:w-1/5 flex-col h-full flex">
		<Chat bind:this={chat} show={chatShow} />
		<div class="lg:h-32 !py-3 lg:!py-6 mt-6 mbox flex lg:flex-col justify-center items-center">
			<input
				type="text"
				class="rounded border border-black px-3 flex-grow text-center w-full"
				placeholder="Your guess..."
				bind:value={chatmsg}
				autocomplete="off"
				on:keyup={(k) => {
					if (k.code == 'Enter') guess();
				}}
				id="chval"
			/>
			<button
				on:click={guess}
				id="chbtn"
				class="rounded border border-black px-3 ml-2 lg:ml-0 lg:mt-2 lg:w-full text-center transition hover:bg-primary active:scale-95"
				>Guess</button
			>
		</div>
	</div>
</div>
{#if isHoliday}
	<Snow />
{/if}
