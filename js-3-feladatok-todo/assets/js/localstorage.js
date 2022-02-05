export default class LocalStorage {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
  
    create(data) {
      this.tasks.push(data);  
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    update(data) {
      let index = this.getIndexByToken(data.token);  

      if (index !== -1) {
        this.tasks[index] = data;  
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }
  
    delete(data) {
      let index = this.getIndexByToken(data.token);  
      if (index !== -1) {
        this.tasks.splice(index, 1);  
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }

    clear() {
      localStorage.clear();
      console.log(localStorage.length)
    }
  
    getIndexByToken(token) {
      for (let item = 0; item < this.tasks.length; item++) {
        if (this.tasks[item].token === token) {
          return item;
        }
      }  
      return -1;
    }
  };
  