var theme = localStorage.getItem("theme") ?? "system";

if (theme == "system") {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        theme = "dark";
    } else {
        theme = "light";
    }
};

document.documentElement.dataset.theme = theme; // set theme based on the loaded data

// Ctrl+Shift+D for switching theme
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
    e.preventDefault();
    
    if (theme == "light") {
        document.documentElement.dataset.theme = "dark";
        localStorage.setItem("theme", "dark");
        theme = "dark";
    } else {
        document.documentElement.dataset.theme = "light";
        localStorage.setItem("theme", "light");
        theme = "light";
    }
}});