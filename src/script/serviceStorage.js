
export const getStorageContactData = () => (localStorage.getItem("phonebook") ?
  JSON.parse(localStorage.getItem("phonebook")) : []);

export const setStorageContactData = (data) => {
  localStorage.setItem("phonebook", JSON.stringify(data));
};

export const addContactData = (contact) => {
  const data = getStorageContactData("phonebook");
  data.push(contact);
  setStorageContactData(data);
  console.log(data);
};

export const removeStorageContactData = (phone) => {
  const data = getStorageContactData("phonebook");
  const newData = data.filter((item) => item.phone !== phone);
  setStorageContactData(newData);
};
