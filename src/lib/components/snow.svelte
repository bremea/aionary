<script lang="ts">
	import type { Engine } from 'tsparticles-engine';
	import { onMount } from 'svelte';
	import { loadFull } from 'tsparticles';

	let ParticlesComponent: any;

	onMount(async () => {
		const module = await import('svelte-particles');

		ParticlesComponent = module.default;
	});

	let particlesConfig = {
		particles: {
			color: {
				value: '#ffffff'
			},
			fullscreen: {
				enabled: true,
				zIndex: -10
			},
			move: {
				direction: 'bottom' as 'bottom',
				enable: true,
				outModes: 'out' as 'out',
				speed: 2
			},
			number: {
				density: {
					enable: true,
					area: 800
				},
				value: 400
			},
			opacity: {
				value: 0.7
			},
			shape: {
				type: 'circle' as 'circle'
			},
			size: {
				value: 10
			},
			wobble: {
				enable: true,
				distance: 10,
				speed: 10
			},
			zIndex: {
				value: {
					min: 0,
					max: 100
				}
			}
		},
		background: {
			color: '#5fa5fa'
		}
	};
	let particlesInit = async (main: Engine) => {
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(main);
	};
</script>

<svelte:component
	this={ParticlesComponent}
	class="fixed -z-50"
	options={particlesConfig}
	{particlesInit}
/>
