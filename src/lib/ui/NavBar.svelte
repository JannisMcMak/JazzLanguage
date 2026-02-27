<script lang="ts">
	import { page } from '$app/state';

	let activeURL = $derived(page.url.pathname);
</script>

<nav
	class="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border/50 bg-card/70 px-2 py-1.5 shadow-xl backdrop-blur-xs"
>
	{#snippet navItem(label: string, href: string, icon: string)}
		<a
			{href}
			class="group flex flex-col items-center justify-center rounded-full px-4 py-1.5 transition-all duration-300 hover:bg-primary/10"
			class:active={activeURL === href}
		>
			<span
				class="iconify text-xl {icon} transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
				class:text-primary={activeURL === href}
				class:text-muted-foreground={activeURL !== href}
			></span>
			<span
				class="text-[10px] font-semibold tracking-wide transition-colors duration-300"
				class:text-primary={activeURL === href}
				class:text-muted-foreground={activeURL !== href}>{label}</span
			>
		</a>
	{/snippet}
	{@render navItem('Learn', '/fragments', 'solar--slider-horizontal-bold-duotone')}
	{@render navItem('Exercises', '/exercises', 'solar--playlist-2-bold-duotone')}
	{@render navItem('Progress', '/progress', 'solar--chart-bold-duotone')}
	{@render navItem('Settings', '/settings', 'solar--settings-bold-duotone')}
</nav>
