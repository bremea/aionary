<script lang="ts">
	import Link from '$lib/components/link.svelte';

	export let show = true;
</script>

<div class={`mw w-full lg:w-1/5 mbox flex-col ${show ? 'lg:flex hidden' : 'lg:hidden flex'}`}>
	<p>Links</p>
	<p class="text-inline items-baseline">
		<span class="text-xs text-primary underline-none mr-2">NEW</span><Link href="/bot">
			Discord Bot</Link
		>
	</p>
	<Link href="https://discord.gg/8uFhTkSyFy" target="_blank">Discord server</Link>
	<Link href="https://twitter.com/playaionary" target="_blank">Official Twitter</Link>
	<Link href="/credits">Credits</Link>
	<Link href="/presskit">Presskit</Link>
	<Link href="/legal.txt">Legal</Link>
	<Link href="mailto:contact@aionary.com" target="_blank">Contact</Link>
	<br />
	<p>Note</p>
	<p class="text-xs">
		AIonary is currently in a BETA release phase. This means there will be occasional site issues.
		If you believe you have found a bug, please report it to the #bugs channel on our Discord server
		(link above).
	</p>
	<div class="flex-grow" />
	<br />
	<p class="text-xs">
		Copyright &copy; Brett Meadows 2022. The owner of this site is not responsible for any user
		generated content.
	</p>
</div>
