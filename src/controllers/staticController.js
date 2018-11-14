module.exports = {
  index(req, res, next){
    res.render("static/index", {title: "Welcome to Bloccit"});
  },

  about(req, res, next) {
<<<<<<< HEAD
    res.render("static/about", { h1: 'About Us' });
=======
    res.render("static/about", {h1: "About Us"});
>>>>>>> assignment-4
  }
}
