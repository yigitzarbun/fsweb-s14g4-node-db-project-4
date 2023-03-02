const knex = require("knex");
const db = require("./../../data/db-config");

function find() {
  return db("tarifler");
}

async function idyeGoreTarifGetir(tarif_id) {
  const tarif = await db("tarifler").where("tarifler.id", tarif_id);
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
    tarif_id: tarif[0].id,
    tarif_adi: tarif[0].tarif_adi,
    kayit_tarihi: tarif[0].kayit_tarihi,
    adimlar: [],
  };

  const adimlarArray = adimlar.forEach((adim) => {
    adimItem = {
      adim_id: adim.id,
      adim_sirasi: adim.adim_sirasi,
      adim_talimati: adim.adim_talimati,
    };
    result.adimlar.push(adimItem);
  });
  return result;
}

module.exports = { find, idyeGoreTarifGetir };
