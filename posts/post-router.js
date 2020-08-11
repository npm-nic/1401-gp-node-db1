const express = require("express");

const db = require("../data/db-config"); //  [1]

const router = express.Router();

router.get("/", (req, res) => {
  //  [2a]
  db.select("*")
    .from("posts")
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {
  //  [2b]
  const post = req.body;
  db("posts")
    .insert(post)
    .returning("id") //  [2c]
    .then((ids) => res.status(201).json({ inserted: ids }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", (req, res) => {
  //  [3]
  const changes = req.body;
  const req_id = req.params.id;

  db("posts")
    .where({ id: req_id }) //  [3a]
    .update(changes)
    .then((count) => {
      count > 0
        ? res.status(200).json({ message: "updated successfully" })
        : res
            .status(404)
            .json({ message: "post does not exist ... can't update" });
    });
});

router.delete("/:id", (req, res) => {
  //  [4]
  const req_id = req.params.id;

  db("posts")
    .where("id", "=", req_id) //  [3a]
    .delete()
    .then((count) => {
      count > 0
        ? res.status(200).json({ message: "deleted successfully" })
        : res
            .status(404)
            .json({ message: "post does not exist ... can't delete" });
    });
});

module.exports = router;

//  [1]
//  database access using knex
//  'db' is our connection to the database
//  --> check out [db-config.js] to see what we will be doing in the future

//  [2]
//  use 'db' to make query commands
//  [a] --> [ 1:35 ]
//  respond with a list of posts from the database
//  --> select * from posts;
//  [b] --> [ 1:38 ]
//  db('posts')
//  --> replaces select from(just a shortcut)
//  .then()
//  --> we get back an array of last ids updated [wrapped in array]
//  [c]
//  .returning() not necessary when using sqlite3
//  --> '.returning() is not supported by sqlite3 and will not have any effect'
//  --> do not remove line of code if planning to support Postgres
//  this is an OKAY warning
//  --> will go away when using Postgres
//  --> all it is saying is that we don't need to be returning an id
//        --> sqlite is already doing that

//  [3]
//  DO NOT FORGET WHERE OR YOU"LL LOSE YOUR JOB
//  [a]
//  --> where id = req_id
//  --> .where('id', '=', req_id)
//  another way to write the same thing

//  [4]
//  very similar to put