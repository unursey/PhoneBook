
import createElements from './createElements.js';

import {
  addContactData,
  removeStorageContactData,
} from './serviceStorage.js';

const {createRow} = createElements;

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add("is-visible");
    document.querySelectorAll(".delete").forEach((del) => {
      del.classList.remove("is-visible");
    });
  };

  const closeModal = () => {
    formOverlay.classList.remove("is-visible");
  };

  btnAdd.addEventListener("click", openModal);

  formOverlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains("close")) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach((contact) => {
    contact.addEventListener("mouseenter", () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener("mouseleave", () => {
      logo.textContent = text;
    });
  });
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener("click", () => {
    document.querySelectorAll(".delete").forEach((del) => {
      del.classList.toggle("is-visible");
    });
  });

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".del-icon")) {
      target.closest(".contact").remove();
      console.log("target.dataset.phone", target.dataset.phone);
      removeStorageContactData(target.dataset.phone);
    }
  });
};

export const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    addContactData(newContact);
    form.reset();
    closeModal();
  });
};

export const sort = (list) => {
  let sortCol;
  if (localStorage.getItem("sort")) {
    sortCol = localStorage.getItem("sort");
  } else {
    sortCol = 1;
  }
  const rows = document.querySelectorAll(".contact");
  const newRows = Array.from(rows);
  newRows.sort((rowA, rowB) => {
    const cellA = rowA.querySelectorAll("td")[sortCol].textContent;
    const cellB = rowB.querySelectorAll("td")[sortCol].textContent;

    switch (true) {
      case cellA > cellB:
        return 1;
      case cellA < cellB:
        return -1;
      case cellA === cellB:
        return 0;
    }
  });

  // [].forEach.call(rows, (row) => {
  //   list.removeChild(row);
  // });

  newRows.forEach((newRow) => {
    list.appendChild(newRow);
  });
};

export const sortRows = (list) => {
  document.querySelectorAll("th").forEach((header, index) => {
    if (index === 1 || index === 2) {
      header.addEventListener("click", () => {
        localStorage.setItem("sort", index);
        sort(list);
      });

      header.style.cursor = "pointer";
    }
  });
};

