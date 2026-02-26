<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div
	class="relative min-h-screen bg-background text-foreground antialiased transition-colors duration-300"
>
	<!-- Ambient background -->
	<div class="pointer-events-none fixed inset-0 overflow-hidden">
		<div
			class="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 opacity-50 blur-3xl dark:opacity-100"
		></div>
		<div
			class="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-primary/3 opacity-50 blur-3xl dark:opacity-100"
		></div>
	</div>

	{@render children()}
	

	<!-- Bottom navigation -->
</div>
