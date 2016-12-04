module.exports = {

  index: function(req, res) {
    res.render("index", {title: "Boxy App", message: "Hello World!"});
  }

}
