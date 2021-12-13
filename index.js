function showNotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notes = []
    }
    else {
        notes = JSON.parse(notes)
    }
    let html = ''
    notes.forEach((element, index) => {
        if (element.important) {
            html += `
                <div class="noteCard importantNote">
            `
        }
        else {
            html += `
                <div class="noteCard">
            `
        }
        html += `
                <h4>${element.title}</h4>
                <p class="noteContent">${element.content}</p>
                <button id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
            </div>
            `
    });
    if (html === '') {
        html = '<h3>Create some notes to see here</h3>'
    }
    document.getElementById('notes').innerHTML = html
}

function addNotetoLS(e) {
    e.preventDefault()
    notes = localStorage.getItem('notes')
    if (notes == null) {
        notes = []
    }
    else {
        notes = JSON.parse(notes)
    }
    let addTitle = document.getElementById('addTitle')
    let addText = document.getElementById('addText')
    let checkbox1 = document.getElementById('checkbox1')
    let obj = {
        title: addTitle.value,
        content: addText.value,
        important: checkbox1.checked
    }
    if (addText.value && addTitle.value) {
        if (checkbox1.checked) {
            notes.unshift(obj)
        }
        else {
            notes.push(obj)
        }
        localStorage.setItem('notes', JSON.stringify(notes))
        addText.value = ''
        addTitle.value = ''
        checkbox1.checked = false
        showNotes()
        if (innerWidth <= 683) {
            document.getElementById('addNote').style.display = 'none';
            document.getElementById('toggleBtn').style.display = 'inline-block';
        }
    }
    else {
        alert('Required Fields cannot be Empty')
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notes = []
    }
    else {
        notes = JSON.parse(notes)
    }
    notes.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes()
}

function searchFunc() {
    let value = searchText.value.toLowerCase()
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName('p')[0]
        let cardTitle = element.getElementsByTagName('h4')[0]
        if (cardTitle.innerText.toLowerCase().includes(value)) {
            element.style.display = "block"
        }
        else if (cardText.innerText.toLowerCase().includes(value)) {
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }
    })
}

function toggle() {
    toggleBtn.style.display = 'none';
    addNote = document.getElementById('addNote')
    addNote.style.display = 'flex';
}

showNotes()
document.getElementById('addBtn').addEventListener('click', addNotetoLS)
document.getElementById('searchText').addEventListener('input', searchFunc)
document.getElementById('toggleBtn').addEventListener('click', toggle)