userData.notes = userData.notes || [];



const noteTitle = document.getElementById("noteTitle");
const noteSubject = document.getElementById("noteSubject");
const noteContent = document.getElementById("noteContent");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

const exportTxtBtn = document.getElementById("exportTxt");
const exportPdfBtn = document.getElementById("exportPdf");

// ---------- SAVE NOTE ----------
if (addNoteBtn) {
  addNoteBtn.addEventListener("click", () => {
    if (!noteTitle.value || !noteSubject.value || !noteContent.value) {
      alert("Fill all fields");
      return;
    }

    userData.notes.push({
      title: noteTitle.value,
      subject: noteSubject.value,
      content: noteContent.value,
      createdAt: new Date().toLocaleDateString()
    });

    localStorage.setItem("smartStudyUser", JSON.stringify(userData));

    noteTitle.value = "";
    noteSubject.value = "";
    noteContent.value = "";

    renderNotes();
  });
}

// ---------- RENDER NOTES ----------
function renderNotes() {
  notesList.innerHTML = "";

  userData.notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note-card";

    div.innerHTML = `
      <h3>${note.title}</h3>
      <small>${note.subject} • ${note.createdAt}</small>
      <p>${note.content}</p>
    `;

    notesList.appendChild(div);
  });
}

// ---------- EXPORT TXT ----------
if (exportTxtBtn) {
  exportTxtBtn.addEventListener("click", () => {
    if (userData.notes.length === 0) {
      alert("No notes to export");
      return;
    }

    let text = "SMART STUDY MANAGER NOTES\n\n";

    userData.notes.forEach((n, i) => {
      text += `Note ${i + 1}\nTitle: ${n.title}\nSubject: ${n.subject}\n${n.content}\n\n`;
    });

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notes.txt";
    link.click();
  });
}

// ---------- EXPORT PDF ----------
if (exportPdfBtn) {
  exportPdfBtn.addEventListener("click", () => {
    if (userData.notes.length === 0) {
      alert("No notes to export");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    userData.notes.forEach((note, i) => {
      doc.text(`Note ${i + 1}`, 10, y); y += 6;
      doc.text(`Title: ${note.title}`, 10, y); y += 6;
      doc.text(`Subject: ${note.subject}`, 10, y); y += 6;

      const lines = doc.splitTextToSize(note.content, 180);
      doc.text(lines, 10, y);
      y += lines.length * 6 + 10;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("notes.pdf");
  });
}

// INIT
renderNotes();
