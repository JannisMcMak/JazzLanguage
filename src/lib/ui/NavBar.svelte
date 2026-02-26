<script lang="ts">
	import { page } from '$app/state';

	let activeURL = $derived(page.url.pathname);
</script>

<nav class="fixed bottom-0 z-50 grid w-full grid-cols-4 border border-border bg-card shadow-inner">
	{#snippet navItem(label: string, href: string, icon: string)}
		<a
			{href}
			class="group btn h-auto! flex-1 flex-col gap-0! rounded-none! p-2"
			class:active={activeURL === href}
		>
			<span class="iconify text-xl {icon}"></span>
			<span class="text-xs font-bold">{label}</span>
		</a>
	{/snippet}
	{@render navItem('Learn', '/fragments', 'solar--slider-horizontal-bold-duotone')}
	{@render navItem('Exercises', '/exercises', 'solar--playlist-2-bold-duotone')}
	{@render navItem('Progress', '/progress', 'solar--chart-bold-duotone')}
	{@render navItem('Settings', '/settings', 'solar--settings-bold-duotone')}
</nav>
