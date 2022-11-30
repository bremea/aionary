<script>
	import Link from "./link.svelte";
	import Logo from "./logo.svelte";

</script>
<div class={`mt-6 mb-6 lg:mb-0 lg:mt-0 lg:h-32 mbox !p-3 lg:!p-6 flex flex-col justify-between items-center`}>
	<p class="text-center text-xs"><Link href="/">Quit game</Link></p>
	<Logo maxSize={4} />
	<p class="text-center text-xs">www.aionary.com</p>
</div>
