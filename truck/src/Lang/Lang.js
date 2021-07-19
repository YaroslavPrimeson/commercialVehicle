var lang = require('./lang.json');
const ru = lang.ru;
var ua = lang.ua;
var en = lang.en;

export const json = () => {
    const lang = localStorage.getItem("NonameDigitalLang");
    switch (lang) {
        case "EN":
            return en;
        case "RU":
            return ru;
        case "UA":
            return ua;
        default:
            return ru;
    }
};
/**
 * Main
 */










