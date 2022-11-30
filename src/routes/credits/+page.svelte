<script>
	import Link from "$lib/components/link.svelte";


	import Logo from "$lib/components/logo.svelte";

</script>
<div class="flex w-full h-screen items-center justify-center">
	<div class="mbox h-fit flex flex-col justify-center items-center m-3 xs:m-6 mb-0">
		<p class="text-center text-xs mb-3"><Link href="/">Go Back</Link></p>
		<Logo maxSize={6} />
		<p class="mt-3">Created By</p>
		<p class="text-center text-xs">Brett Meadows</p>
		<p class="mt-3">Powered By</p>
		<p class="text-center text-xs">Stable Diffusion & fly.io</p>
		<p class="mt-3">Special Thanks</p>
		<p class="text-center text-xs">kaj, nebula, stacy</p>
	</div>
</div>
