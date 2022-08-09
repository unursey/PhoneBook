import createElements from './createElements';

const {
  createImageLogo,
  createHeader,
  createLogo,
  createCopyright,
  createMain,
  createButtonGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
} = createElements;

const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const imageLogo = createImageLogo();
  const logo = createLogo(title);
  const copyright = createCopyright(title);
  const main = createMain();
  const buttonGroup = createButtonGroup([
    {
      className: "btn btn-primary me-3 mr-3",
      type: "button",
      text: "Добавить",
    },
    {
      className: "btn btn-danger",
      type: "button",
      text: "Удалить",
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter();

  header.headerContainer.append(imageLogo, logo);
  footer.footerContainer.append(copyright);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};

export default {
  renderPhoneBook,
  renderContacts,
};
