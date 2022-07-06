
import {
  modalControl,
  hoverRow,
  deleteControl,
  formControl,
  sortRows,
  sort,
} from './modules/control.js';

import render from './modules/render.js';
import {
  getStorageContactData as getContactData,
} from './modules/serviceStorage.js';

const {
  renderPhoneBook,
  renderContacts,
} = render;

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getContactData();
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    hoverRow(allRow, logo);
    sortRows(list);
    sort(list);
  };

  window.phoneBookInit = init;
}
