const settingsMenu = document.getElementById("settingsMenu");
const themeSet = document.getElementById("theme");

var theme = localStorage.getItem("theme") ?? "system";

var settingsHidden = true;

// set theme based on the loaded data supporting system theme
setTheme(theme); 
themeSet.value = theme;

function toggleTheme() {
    if (theme == "light") {
        document.documentElement.dataset.theme = "dark";
        localStorage.setItem("theme", "dark");
        theme = "dark";
    } else {
        document.documentElement.dataset.theme = "light";
        localStorage.setItem("theme", "light");
        theme = "light";
    }
}

function setTheme(themeSel) {
    switch (themeSel) {
        case "system":
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                themeToGo = "dark";
                break;
            } else {
                themeToGo = "light";
                break;
            }

        case "dark":
            themeToGo = "dark";
            break;

        case "light":
            themeToGo = "light";
            break;
        
        default:
            themeToGo = "light";
            break;
    }

    document.documentElement.dataset.theme = themeToGo;
    localStorage.setItem("theme", themeSel);
    theme = themeSel;

}

// Ctrl+Shift+D for switching theme
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
    e.preventDefault();
    
    toggleTheme();
}});

function toggleSettings() {
    settingsHidden = !settingsHidden;

    settingsMenu.hidden = settingsHidden;
}

document.addEventListener('keydown', function(e) {
    if (e.key == 'Escape') {
        settingsHidden = true;
        settingsMenu.hidden = true;
    }
});

// look for changes in theme setting
themeSet.addEventListener('change', function(e) {
    setTheme(e.target.value);
});