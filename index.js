const restify = require('restify');
const db = require('./db.js')
const corsMiddleware = require('restify-cors-middleware')

function posts(req, res, next) {
  db.Post
    .findAll()
    .then(post => post.map(p => p.get({plain: true})))
    .then(post => {
      res.send(post)
      next();
    });
}

function newPost(req, res, next) {
  db.Post
  .create({title: req.body.title, body: req.body.body, author: req.body.author})
  .then(post => {
    console.log(post)
    console.log(post.get({plain: true}))
    res.send(post.get({plain: true}));
    next();
  })
}

const server = restify.createServer();
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: [/.*/]
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.bodyParser())
server.get('/posts', posts);
server.post('/posts', newPost);
// server.get('/post/:id', postById);
// server.delete('/post/:id', deletepostById);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
