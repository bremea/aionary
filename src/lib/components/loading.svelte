<script lang="ts">
	import { onMount } from 'svelte';

	let loading = ['|', '/', '—', '\\'];
	let lX = 0;

	onMount(async () => {
		setInterval(() => {
			lX++;
			if (lX === loading.length) lX = 0;
		}, 100);
	});
</script>

<p class="text-primary z-10">({loading[lX]})</p>
