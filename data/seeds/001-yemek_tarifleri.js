/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("miktar").truncate();
  await knex("icindekiler").truncate();
  await knex("adimlar").truncate();
  await knex("tarifler").truncate();
  await knex("tarifler").insert([
    { tarif_adi: "pizza", kayit_tarihi: "2021-01-01 08:23:19.120" },
    { tarif_adi: "tost", kayit_tarihi: "2021-02-02 08:23:19.120" },
  ]);
  await knex("adimlar").insert([
    { adim_sirasi: 1, adim_talimati: "fırını ısıt", tarifler_id: 1 },
    { adim_sirasi: 2, adim_talimati: "malzemeleri hazırla", tarifler_id: 1 },
    { adim_sirasi: 3, adim_talimati: "pizzayi firina koy", tarifler_id: 1 },
    { adim_sirasi: 1, adim_talimati: "tost makinasını ısıt", tarifler_id: 2 },
    { adim_sirasi: 2, adim_talimati: "malzemeleri hazırla", tarifler_id: 2 },
    { adim_sirasi: 3, adim_talimati: "tostu makinaya koy", tarifler_id: 2 },
  ]);
  await knex("icindekiler").insert([
    { icindekiler_adi: "hamur" },
    { icindekiler_adi: "ekmek" },
    { icindekiler_adi: "peynir" },
    { icindekiler_adi: "domates" },
  ]);
  await knex("miktar").insert([
    { tarifler_id: 1, adimlar_id: 2, icindekiler_id: 1, miktar: 250 },
    { tarifler_id: 1, adimlar_id: 2, icindekiler_id: 3, miktar: 100 },
    { tarifler_id: 1, adimlar_id: 2, icindekiler_id: 4, miktar: 150 },
    { tarifler_id: 2, adimlar_id: 2, icindekiler_id: 2, miktar: 100 },
    { tarifler_id: 2, adimlar_id: 2, icindekiler_id: 3, miktar: 50 },
    { tarifler_id: 2, adimlar_id: 2, icindekiler_id: 4, miktar: 75 },
  ]);
};
