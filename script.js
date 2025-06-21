const deleteBtn = document.getElementById("delete-folder");
// ⏰ Live Clock + Date
function updateClock() {
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");
    const now = new Date();
  
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
  
    clock.textContent = `${hours}:${minutes}`;
    date.textContent = `${day}/${month}/${year}`;
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  
  
  // 🖱️ Desktop + Context Menu Setup
  const desktop = document.getElementById("desktop");
  const contextMenu = document.getElementById("context-menu");
  const newFolderBtn = document.getElementById("new-folder");
  const renameBtn = document.getElementById("rename-folder");
  let rightClickedIcon = null;
  
  // 📐 Folder Layout Settings
  let folderCount = 1;
  let iconTop = 110; 
  let iconLeft = 10;
  const iconHeight = 90;
  
  
  // 📂 Create New Folder
  function placeNewFolder() {
    const desktopHeight = desktop.clientHeight;
  
    const folder = document.createElement("div");
    folder.classList.add("desktop-icon");
    folder.style.top = `${iconTop}px`;
    folder.style.left = `${iconLeft}px`;
    folder.innerHTML = `
      <img src="images/folder.png" alt="Folder" />
      <span>New Folder</span>
    `;
  
    desktop.appendChild(folder);
    folderCount++;
  
    // Move to next row/column logic
    iconTop += iconHeight;
    if (iconTop + iconHeight > desktopHeight) {
      iconTop = 10;
      iconLeft += 100;
    }
  }
  
  newFolderBtn.addEventListener("click", placeNewFolder);
  
  
  // 📋 Context Menu Handling
  desktop.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  
    const targetIcon = e.target.closest('.desktop-icon');
    rightClickedIcon = targetIcon || null;

    if (rightClickedIcon) {
        deleteBtn.classList.remove("hidden");
      } else {
        deleteBtn.classList.add("hidden");
      }
  
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.classList.remove("hidden");
  });
  
  // Hide context menu on left click
  document.addEventListener("click", () => {
    contextMenu.classList.add("hidden");
  });
  
  
  // ✏️ Rename Functionality
  renameBtn.addEventListener("click", () => {
    if (!rightClickedIcon) return;
  
    const labelSpan = rightClickedIcon.querySelector("span");
    const currentName = labelSpan.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentName;
    input.classList.add("rename-input");
    input.style.width = "90%";
    input.style.fontSize = "12px";
    input.style.textAlign = "center";
  
    rightClickedIcon.replaceChild(input, labelSpan);
    input.focus();
  
    const finishRename = () => {
      const newName = input.value.trim() || currentName;
      const newSpan = document.createElement("span");
      newSpan.textContent = newName;
      rightClickedIcon.replaceChild(newSpan, input);
      rightClickedIcon = null;
    };
  
    input.addEventListener("blur", finishRename);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finishRename();
    });
  
    contextMenu.classList.add("hidden");
  });


  // 🗑️ Delete Functionality
deleteBtn.addEventListener("click", () => {
    if (!rightClickedIcon) return;
  
    rightClickedIcon.remove();  
    rightClickedIcon = null;
    contextMenu.classList.add("hidden");
  });