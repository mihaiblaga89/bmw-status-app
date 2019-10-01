const Datastore = window.require('electron').remote.require('nedb-promises');

const db = {
    settings: Datastore.create('./db.db'),
};
export default db;
