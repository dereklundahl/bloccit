const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

    beforeEach((done) => {
        this.topic;
        this.flair;
        this.post;

        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Winter Games",
                description: "Post your Winter Games stories."
            })
            .then((topic) => {
                this.topic = topic;

                Flair.create({
                    name: "Olympics",
                    color: "red, white, and blue",
                    topicId: this.topic.id
                })
                .then((flair) => {
                    this.flair = flair;
                    
                    Post.create({
                        title: "Bobsleds",
                        body: "The are so cool",
                        topicId: this.topic.id
                    })
                    .then((post) => {
                        this.post = post;
                        done();
                    })
                  })
                  .catch((err) => {
                      console.log(err);
                      done();
                  });
            });
        });

    });

    describe("GET /topics/:topcId/flairs/new", () => {

        it("should render a new flair form", (done) => {
            request.get(`${base}/${this.topic.id}/flairs/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Flair");
                done();
            });
        });
    });

    describe("POST /topics/:topicId/flairs/create", () => {

        it("should create a new flair and redirect", (done) => {
            const options = {
                url: `${base}/${this.topic.id}/flairs/create`,
                form: {
                    name: "Olympics",
                    color: "red, white, and blue"
                }
            };
            request.post(options,
                (err, res, body) => {

                    Flair.findOne({where: {name: "Olympics"}})
                    .then((flair) => {
                        expect(flair).not.toBeNull();
                        expect(flair.name).toBe("Olympics");
                        expect(flair.color).toBe("red, white, and blue");
                        expect(flair.topicId).not.toBeNull();
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });
    });

    describe("GET /topics/:topicId/flairs/:id", () => {

        it("should render a view with the selected flair", (done) => {
            request.get(`${base}/${this.topic.id}/flairs/${this.flair.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("red, white, and blue");
                done();
            });
        });
    });

});