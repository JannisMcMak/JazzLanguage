<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BottomNav, BottomNavItem, Navbar, NavBrand, Tooltip } from 'flowbite-svelte';
	import { CogSolid, ListMusicSolid, MusicSolid, RocketSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/state';

	let { children } = $props();

	let activeURL = $derived(page.url.pathname);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="h-screen bg-gray-50 dark:bg-gray-900">
	<nav class="flex w-full items-center px-2 py-4 sm:px-4 md:px-8">
		<MusicSolid size="lg" class="me-1 dark:text-white" />
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
			Jazz<span class="text-primary-500">Shed</span>
		</span>
	</nav>

	<main
		class="overflow-y-auto bg-gray-50 px-2 pb-16 text-gray-900 sm:px-4 md:px-8 dark:bg-gray-900 dark:text-gray-50"
	>
		{@render children()}
	</main>

	<BottomNav activeUrl={activeURL} position="fixed" classes={{ inner: 'grid-cols-3' }}>
		<BottomNavItem
			btnName="Learn"
			href="/"
			activeClass="text-primary-600! [&>svg]:text-primary-600! dark:text-primary-500! dark:[&>svg]:text-primary-500!"
		>
			<ListMusicSolid
				class="mb-1 h-6 w-6 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
			/>
		</BottomNavItem>
		<BottomNavItem
			btnName="Progress"
			href="/progress"
			activeClass="text-primary-600! [&>svg]:text-primary-600! dark:text-primary-500! dark:[&>svg]:text-primary-500!"
		>
			<RocketSolid
				class="mb-1 h-6 w-6 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
			/>
		</BottomNavItem>
		<BottomNavItem
			btnName="Settings"
			href="/settings"
			activeClass="text-primary-600! [&>svg]:text-primary-600! dark:text-primary-500! dark:[&>svg]:text-primary-500!"
		>
			<CogSolid
				class="mb-1 h-6 w-6 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
			/>
		</BottomNavItem>
	</BottomNav>
</div>
