<script>
	import Link from '$lib/components/link.svelte';
	import Logo from '$lib/components/logo.svelte';
	import { page } from '$app/stores';
</script>

<div class="flex w-full h-screen items-center justify-center">
	<div class="mbox h-fit flex flex-col justify-center items-center m-3 xs:m-6 mb-0">
		<Logo maxSize={6} />
		<p class="mt-3">Error {$page.status}</p>
		<p class="text-xs">I'm sorry Dave, I'm afraid I can't do that.</p>
		<p class="text-center text-xs"><Link href="/">Return Home</Link></p>
	</div>
</div>
