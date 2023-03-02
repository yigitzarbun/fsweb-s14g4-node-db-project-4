const knex = require("knex");
const db = require("./../../data/db-config");

function find() {
  return db("tarifler");
}

async function idyeGoreTarifGetir(tarif_id) {
  const tarifler = await db("tarifler");
  const adimlar = await db("tarifler")
    .leftJoin("adimlar", "tarifler.id", "adimlar.tarifler_id")
    .select("adimlar.id", "adimlar.adim_sirasi", "adimlar.adim_talimati")
    .where("tarifler.id", tarif_id);
  const icindekiler = await db("miktar")
    .leftJoin("tarifler", "tarifler.id", "miktar.tarifler_id")
    .leftJoin("icindekiler", "miktar.icindekiler_id", "icindekiler.id")
    .select("icindekiler.icindekiler_adi")
    .where("tarifler.id", tarif_id);
  const miktar = await db("miktar")
    .leftJoin("tarifler", "tarifler.id", "miktar.tarifler_id")
    .select("miktar.miktar")
    .where("tarifler.id", tarif_id);

  const result = {
    tarif_id: null,
    tarif_adi: "",
    kayit_tarihi: "",
    adimlar: [
      {
        adim_id: null,
        adim_sirasi: null,
        adim_talimati: "",
        icindekiler: [],
      },
      {
        adim_id: null,
        adim_sirasi: null,
        adim_talimati: "",
        icindekiler: [
          { icindekiler_id: null, icindekiler_adi: "", miktar: null },
          { icindekiler_id: null, icindekiler_adi: "", miktar: null },
          { icindekiler_id: null, icindekiler_adi: "", miktar: null },
        ],
      },
    ],
  };
  return result;
}

module.exports = { find, idyeGoreTarifGetir };
