const textarea = document.getElementById('textarea');

// load existing local storage if availible
var content = localStorage.getItem("content") ?? "";
var theme = localStorage.getItem("theme") ?? "system";

if (theme == "system") {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        theme = "dark";
    } else {
        theme = "light";
    }
};

textarea.value = content; // set content of textarea based on the loaded data
document.documentElement.dataset.theme = theme; // set theme based on the loaded data

// update content local storage every time the textarea is updated
textarea.addEventListener('input', function(e) {
    localStorage.setItem("content", textarea.value);
});

// make tab actually type a tab
textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
      
        const start = this.selectionStart;
        const end = this.selectionEnd;

        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

        this.selectionStart = this.selectionEnd = start + 1;
    }
});

// make text save in a new doc when Crtl+S-ing
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    
    saveAsContent();
}});

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

// shows the external save as window to save the text doc
async function saveAsContent() {
    try {
        const handle = await window.showSaveFilePicker({
            suggestedName: 'new-text-file.txt',
            types: [{
                description: 'TXT File',
                accept: { 'text/plain': ['.txt'] },
            }],
        });
        
        const writable = await handle.createWritable();
        await writable.write(textarea.value);
        await writable.close();
        
    } catch (err) {
        console.log('ERR: Could not save file. ERR Message:', err);
    }
};