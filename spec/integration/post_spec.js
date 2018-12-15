const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("routes : post", () => {

    beforeEach((done) => {
        this.topic;
        this.post;


        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Winter Games",
                description: "Post your Winter Games stories."
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "Snowball Fighting",
                    body: "So much snow!",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

    });

    describe("GET /topics/:topicId/posts/new", () => {

        it("should render a new post form", (done) => {
            request.get(`${base}/${this.topic.id}/posts/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Post");
                done();
            });
        });

    });
    
    describe("POST /topics/:topicId/posts/create", () => {

        it("should create a new post and redirect", (done) => {
            const options = {
                url: `${base}/${this.topic.id}/posts/create`,
                form: {
                    title: "Watching snow melt",
                    body: "Without a doubt my favoriting things to do besides watching paint dry!"
                }
            };
            request.post(options,
                (err, res, body) => {

                    Post.findOne({where: {title: "Watching snow melt"}})
                    .then((post) => {
                        expect(post).not.toBeNull();
                        expect(post.title).toBe("Watching snow melt");
                        expect(post.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
                        expect(post.topic.Id).not.toBeNull();
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

    describe("GET /topics/:topicId/posts/:id", () => {

        it("should render a view with the selected post", (done) => {
            console.log(`topic id: ${this.topic.id}`);
            console.log(`post id: ${this.post.id}`);
            console.log(`base is: ${base}`);
            console.log(`${base}/${this.topic.id}/posts/${this.post.id}`)
    
            request.get(`${base}/${this.topic.id}/posts/${this.post.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Snowball Fighting");
            });
        });
    });

});