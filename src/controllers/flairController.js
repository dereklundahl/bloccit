const flairQueries = require("../db/queries.flairs.js");

module.exports = {
  new(req, res, next){
      res.render("flairs/new", {topicId: req.params.topicId});
  },

  create(req, res, next){
      let newFlair = {
          name: req.body.name,
          color: req.body.color,
          topicId: req.params.topicId
      };
      flairQueries.addFlair(newFlair, (err, flair) => {
          if(err){
              res.redirect(500, "/flairs/new");
          } else {
              res.redirect(303, `/topics/${newFlair.topicId}/flairs/${flair.id}`);
          }
      });
  },

  show(req, res, next){
      flairQueries.getFlair(req.params.id, (err, flair) => {
          if(err || flair == null){
              res.redirect(404, "/");
          } else {
              res.render("flairs/show", {flair});
          }
      });
  }
}