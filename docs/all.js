const settingsMenu = document.getElementById("settingsMenu");
const footerE = document.getElementById("footer");

const themeSet = document.getElementById("themeSet");
const footerSet = document.getElementById("footerSet");

var theme = localStorage.getItem("theme") ?? "system";
var footer = localStorage.getItem("footer") === "true";

var settingsHidden = true;

// set theme based on the loaded data
setTheme(theme); 
themeSet.value = theme;

footerE.hidden = footer;
footerSet.checked = footer;

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

    themeSet.value = theme;
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

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

systemTheme.addEventListener('change', function() {
    if (theme == "system") {
        setTheme("system");
    }
});

// Ctrl+Shift+D for switching theme
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
    e.preventDefault();
    
    toggleTheme();
}});

// Ctrl+Shift+F for toggling footer
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
    e.preventDefault();
    
    footer = !footer;
    localStorage.setItem("footer", footer);
    footerE.hidden = footer;
    footerSet.checked = footer;
    
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

// look for changes in settings
themeSet.addEventListener('change', function(e) {
    setTheme(e.target.value);
});

footerSet.addEventListener('change', function(e) {
    footer = e.target.checked;
    localStorage.setItem("footer", footer);
    footerE.hidden = footer;
});
