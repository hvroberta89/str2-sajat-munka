import {createTable,
    editClickListener,
    deleteClickListener,
    createClickListener} from "./constructDOM.js";

async function init() {
    createTable();
    editClickListener();
    deleteClickListener();
    createClickListener();
}


init();