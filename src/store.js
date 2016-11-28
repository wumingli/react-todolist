/**
 * Created by wumingli on 16/8/8.
 */
const STORAGE_KEY = 'react_todos';

class Store {
    static fetch() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    static save(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
}

module.exports = Store;