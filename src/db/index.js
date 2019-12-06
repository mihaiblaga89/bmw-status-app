const Store = window.require('electron').remote.require('electron-store');

const settings = new Store();
const db = {
    settings,
};
export default db;
