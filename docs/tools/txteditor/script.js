const textarea = document.getElementById('textarea');
const importOverlay = document.getElementById("importOverlay");

// === LOCALSTORAGE ===

var content = localStorage.getItem("txteditor-content") ?? "";

textarea.value = content;

textarea.addEventListener('input', function(e) {
    localStorage.setItem("txteditor-content", textarea.value);
});

// === FUNCTIONALITY ===

textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
      
        const start = this.selectionStart;
        const end = this.selectionEnd;

        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

        this.selectionStart = this.selectionEnd = start + 1;

        localStorage.setItem("txteditor-content", textarea.value);
    }
});

// === SAVING ===

document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    
    saveAsContent();
}});

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

// === IMPORTING ===

function shouldImport(event) {
    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length !== 1) return false;

    const file = files[0];
    const hasExtension = file.name.toLowerCase().endsWith('.txt');
    const hasMime = file.type === 'text/plain' || file.type === '';

    return hasExtension && hasMime;
}

function canDrop(event) {
    if (!event.dataTransfer || !Array.from(event.dataTransfer.types).includes('Files')) {
        return false;
    }

    const items = Array.from(event.dataTransfer.items).filter(
        (item) => item.kind === 'file'
    );

    if (items.length !== 1) return false;

    return items[0].type === 'text/plain' || items[0].type === '';
}

textarea.addEventListener('dragenter', (event) => {
  event.preventDefault();
  importOverlay.hidden = !canDrop(event);
});

textarea.addEventListener('dragover', (event) => {
  event.preventDefault();
});

textarea.addEventListener('dragleave', (event) => {
  event.preventDefault();
  importOverlay.hidden = true;
});

textarea.addEventListener('drop', async (event) => {
    event.preventDefault();
    importOverlay.hidden = true;

    if (!shouldImport(event)) return;

    const text = await event.dataTransfer.files[0].text();
    textarea.value = text;

    localStorage.setItem("txteditor-content", textarea.value);
})