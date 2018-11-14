module.exports = {
  index(req, res, next){
    res.render("static/index", {title: "Welcome to Bloccit"});
  },

  about(req, res, next) {
<<<<<<< HEAD
<<<<<<< HEAD
    res.render("static/about", { h1: 'About Us' });
=======
    res.render("static/about", {h1: "About Us"});
>>>>>>> assignment-4
=======

    res.render("static/about", {h1: "About Us"});
>>>>>>> 2caaf9f9ed0df2c72a8a931095e5bf571b3f9228
  }
}
