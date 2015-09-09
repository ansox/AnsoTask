function getConfig() {
  this.exibirFinalizadas = localStorage.getItem("exibirFinalizadas") === "true";

  this.save = function() {
    localStorage.setItem("exibirFinalizadas", this.exibirFinalizadas)
  };
}
