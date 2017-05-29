import * as types from './mutations_types';

module.exports = {
    set_menu_open: ({
        commit
    }) => {
        commit(types.SET_MENU_OPEN);
    },
    set_menu_close: ({
        commit
    }) => {
        commit(types.SET_MENU_CLOSE);
    }
};