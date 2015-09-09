function getListaTasks() {
  this.items = [];
  var lista = localStorage.getItem("lista");

  if (lista !== null)
    this.items = JSON.parse(lista);

  this.save = function() {
    var lista =  JSON.stringify(this.items);

    localStorage.setItem("lista", lista);
  };

  this.add = function(item) {
    if (this.items === null || this.items.indexOf(item) < 0)
    {
      this.items.push(item);
    }
  };

  this.remove = function(item) {
    this.items.splice(this.items.indexOf(item), 1);
  };
};
