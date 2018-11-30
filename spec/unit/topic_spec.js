const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

           Topic.create({
               title: "Hiking Trails",
               description: "The best day hikes"
           })
           .then((topic) => {
               this.topic = topic;
               Post.create({
                   title: "Colorado Front Range",
                   body: "The best hikes are in the Front Range",
                   topicId: this.topic.id
               })
               .then((post) => {
                   this.post = post;
                   done();
               });
           }) 
           .catch((err) => {
               console.log(err);
               done();
           });
        });
    });

    describe("#create()", () => {
        it("should create a topic object with a title and description", (done) => {
          Topic.create({
              title: "Mountain Biking",
              description: "A place to talk about all things mountain biking."
          })
          .then((topic) => {
              expect(topic.title).toBe("Mountain Biking");
              expect(topic.description).toBe("A place to talk about all things mountain biking.");
              done();
          })
          .catch((err) => {
              console.log(err);
              done();
          });
        });
        it("should not create a topic object with missing title or description", (done) => {
            Topic.create({
                title: "Mountain Biking"
            })
            .then((topic) => {
                this.topic = topic;
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Topic.description cannot be null");
                done();
            })
        });
    });
    describe("#getPosts()", () => {
        it("should return an array of posts associated with a specific topic", (done) => {
            this.topic.getPosts()
            .then((associatedPosts) => {
                expect(associatedPosts[0].title).toBe("Colorado Front Range");
                expect(associatedPosts[0].topicId).toBe(this.topic.id);
                done();
            });
        });
    });
});