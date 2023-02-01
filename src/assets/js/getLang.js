export const getLang = () => {
  let lang = localStorage.getItem("langBird");

  if (!lang) {
    localStorage.setItem("langBird", "ru");
    lang = "ru";
  }

  return lang;
};
