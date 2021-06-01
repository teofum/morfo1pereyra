const themes = [
  {
    primary: 'hsl(120, 88%, 72%)',
    accent: 'hsl(240, 100%, 27%)'
  },
  {
    primary: 'hsl(18, 100%, 77%)',
    accent: 'hsl(240, 100%, 27%)'
  },
  {
    primary: 'hsl(187, 85%, 72%)',
    accent: 'hsl(240, 100%, 27%)'
  },
  {
    primary: 'hsl(300, 76%, 75%)',
    accent: 'hsl(240, 100%, 27%)'
  }
];

const randomizeTheme = () => {
  if (themes.length < 1) return;

  const themeIndex = ~~(Math.random() * themes.length);
  document.body.style.setProperty('--color-primary', themes[themeIndex].primary);
  document.body.style.setProperty('--color-accent', themes[themeIndex].accent);
};

randomizeTheme();