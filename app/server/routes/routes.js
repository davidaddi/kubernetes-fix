const { Router } = require("express");
const Base = require("../models/base");

const router = new Router();

router.get("/", async (req, res, next) => {
    if (req.baseId) {
      req.query.id = req.baseId;
    }
    res.json(
      await Base.findAll({
        where: req.query,
      })
    );
});

router.post("/", async (req, res, next) => {
    try {
      res.status(201).json(await Base.create(req.body));
    } catch (err) {
      res.status(422).json({"An error occurred": err});
    }
  });

module.exports = router;
