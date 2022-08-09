import image from '../img/icon.svg';

const createImageLogo = () => {
  const img = document.createElement('img');
  img.src = image;
  return img;
};

const createContainer = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  return container;
};

const createHeader = () => {
  const header = document.createElement("header");
  header.classList.add("header");

  const headerContainer = createContainer();
  header.append(headerContainer);

  header.headerContainer = headerContainer;
  return header;
};

const createLogo = (title) => {
  const h1 = document.createElement("h1");
  h1.classList.add("logo");
  h1.textContent = `Телефонный справочник. ${title}`;

  return h1;
};

const createCopyright = (title) => {
  const сopyright = document.createElement("p");
  сopyright.textContent = `Все права защищены ©${title}`;

  return сopyright;
};

const createMain = () => {
  const main = document.createElement("main");

  const mainContainer = createContainer();
  main.append(mainContainer);

  main.mainContainer = mainContainer;

  return main;
};

const createButtonGroup = (params) => {
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btn-wrapper");

  const btns = params.map(({ className, type, text }) => {
    const button = document.createElement("button");
    button.type = type;
    button.className = className;
    button.textContent = text;
    return button;
  });

  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

const createTable = () => {
  const table = document.createElement("table");
  table.classList.add("table", "table-striped");

  const thead = document.createElement("thead");
  thead.insertAdjacentHTML(
    "beforeend",
    `
        <tr>
            <th class="delete">Удалить</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
            <th class="edit">Изменить</th>
        </tr>
    `
  );

  const tbody = document.createElement("tbody");

  table.append(thead, tbody);
  table.tbody = tbody;

  return table;
};

const createForm = () => {
  const overlay = document.createElement("div");
  overlay.classList.add("form-overlay");

  const form = document.createElement("form");
  form.classList.add("form");
  form.insertAdjacentHTML(
    "beforeend",
    `
        <button class="close border-0 bg-transparent" type="button"></button>
        <h2 class="form-title">Добавить контакт</h2>
        <div class="form-group">
            <label class="form-label" for="name">Имя: </label>
            <input class="form-input" name="name" 
                id="name" type="text" required>
        </div>
        <div class="form-group">
            <label class="form-label" for="surname">Фамилия: </label>
            <input class="form-input" name="surname" 
                id="surname" type="text" required>
        </div>
        <div class="form-group">
            <label class="form-label" for="phone">Телефон: </label>
            <input class="form-input" name="phone" 
                id="phone" type="text" required>
        </div>
    `
  );
  const buttonGroup = createButtonGroup([
    {
      className: "btn btn-primary me-3 mt-4 mr-3",
      type: "submit",
      text: "Добавить",
    },
    {
      className: "btn btn-danger mt-4",
      type: "reset",
      text: "Очистить",
    },
  ]);

  form.append(...buttonGroup.btns);

  overlay.append(form);

  return {
    overlay,
    form,
  };
};

const createFooter = () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const footerContainer = createContainer();
  footer.append(footerContainer);

  footer.footerContainer = footerContainer;
  return footer;
};

const createRow = ({name: firstName, surname, phone}) => {
  const tr = document.createElement("tr");
  tr.classList.add("contact");

  const tdDel = document.createElement("td");
  tdDel.classList.add("delete");
  const buttonDel = document.createElement("button");
  buttonDel.classList.add("del-icon");
  buttonDel.dataset.phone = phone;
  tdDel.append(buttonDel);

  const tdName = document.createElement("td");
  tdName.textContent = firstName;

  const tdSurname = document.createElement("td");
  tdSurname.textContent = surname;

  const tdPhone = document.createElement("td");
  const phoneLink = document.createElement("a");
  phoneLink.href = `tel:${phone}`;
  tdPhone.append(phoneLink);
  phoneLink.textContent = phone;

  const tdEdit = document.createElement("td");
  tdEdit.classList.add("edit");
  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("edit-icon");
  tdEdit.append(buttonEdit);

  tr.phoneLink = phoneLink;
  tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

  return tr;
};

export default {
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
};
