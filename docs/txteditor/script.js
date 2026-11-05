const textarea = document.getElementById('textarea');

// load existing local storage if availible
var content = localStorage.getItem("content") ?? "";
var theme = localStorage.getItem("theme") ?? "light";

textarea.value = content; // set content of textarea based on the loaded data

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