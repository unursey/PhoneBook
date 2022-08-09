import {
  modalControl,
  hoverRow,
  deleteControl,
  formControl,
  sortRows,
  sort,
} from "./control";

import render from "./render";
import { getStorageContactData as getContactData } from "./serviceStorage";

const { renderPhoneBook, renderContacts } = render;

export const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const data = getContactData();
  const { list, logo, btnAdd, formOverlay, form, btnDel } = renderPhoneBook(
    app,
    title,
  );

  const allRow = renderContacts(list, data);
  const { closeModal } = modalControl(btnAdd, formOverlay);

  deleteControl(btnDel, list);
  formControl(form, list, closeModal);
  hoverRow(allRow, logo);
  sortRows(list);
  sort(list);
};
