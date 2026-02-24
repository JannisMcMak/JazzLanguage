const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const applyTheme = () => {
	document.documentElement.classList.toggle(
		'dark',
		localStorage.theme === 'dark' || (!('theme' in localStorage) && mediaQuery.matches)
	);
};
mediaQuery.addEventListener('change', () => applyTheme());
applyTheme();
