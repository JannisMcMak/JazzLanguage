<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();

	let activeURL = $derived(page.url.pathname);
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

	<!-- Header -->
	<header
		class="sticky z-50 flex items-center space-x-2 border-b border-border/50 bg-background/80 px-4 py-2 backdrop-blur-sm"
	>
		<span class="iconify text-primary solar--music-note-bold-duotone"></span>
		<h1 class="text-2xl font-bold tracking-tight text-foreground">
			Jazz<span class="text-primary">Language</span>
		</h1>
	</header>

	<!-- Main content -->
	<main
		class="min-h-[calc(100vh-4rem)] overflow-y-auto px-2 pt-2 pb-20 sm:px-4 sm:pt-4 md:px-8 md:pt-8"
	>
		{@render children()}
	</main>

	<!-- Bottom navigation -->
	<nav
		class="fixed bottom-0 z-50 grid w-full grid-cols-3 border border-border bg-card shadow-inner"
	>
		{#snippet navItem(label: string, href: string, icon: string)}
			<a {href} class="group btn flex-1 flex-col p-2" class:active={activeURL === href}>
				<span class="iconify text-2xl {icon}"></span>
				<span class="text-xs font-bold">{label}</span>
			</a>
		{/snippet}
		{@render navItem('Learn', '/', 'solar--playlist-2-bold-duotone')}
		{@render navItem('Progress', '/progress', 'solar--chart-bold-duotone')}
		{@render navItem('Settings', '/settings', 'solar--settings-bold-duotone')}
	</nav>
</div>
