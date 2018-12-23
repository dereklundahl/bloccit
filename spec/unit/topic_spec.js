const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.user;

        sequelize.sync({force: true}).then((res) => {

            User.create({
                email: "starman@tesla.com",
                password: "Trekkie4lyfe"
            })
            .then((user) => {
                this.user = user;

                Topic.create({
                    title: "Expeditions to Alpha Centauri",
                    description: "A compilation of reports of reports from recent visits to the star system.",

                    posts: [{
                        title: "My first visit to Proxima Centauri b",
                        body: "I saw some rocks.",
                        userId: this.user.id
                    }]
                }, {

                    include: {
                        model: Post,
                        as: "posts"
                    }
                })
                .then((topic) => {
                    this.topic = topic;
                    this.post = topic.post[0];
                    done();
                })
            })
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
    
    describe("#getPost()", () => {
        it("should return an array of posts associated with a specific topic", (done) => {
            console.log(typeof(this.topic.getPost));
            this.topic.getPosts()
            .then((associatedPosts) => {
                expect(associatedPosts[0].title).toBe("Colorado Front Range");
                expect(associatedPosts[0].topicId).toBe(this.topic.id);
                done();
            });
        });
    });
});