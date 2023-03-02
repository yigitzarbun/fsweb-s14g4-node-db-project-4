const express = require("express");
const router = express.Router();
const tarifler = require("./tarifler-model");

router.get("/", (req, res, next) => {
  tarifler
    .find()
    .then((tarifler) => {
      res.json(tarifler);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  tarifler
    .idyeGoreTarifGetir(id)
    .then((tarif) => res.json(tarif))
    .catch(next);
});
module.exports = router;
