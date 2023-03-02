/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("tarifler", (tbl) => {
      tbl.increments();
      tbl.string("tarif_adi").unique().notNullable();
      tbl.timestamp("kayit_tarihi").notNullable();
    })
    .createTable("adimlar", (tbl) => {
      tbl.increments();
      tbl.integer("adim_sirasi").unsigned().notNullable();
      tbl.string("adim_talimati").notNullable();
      tbl
        .integer("tarifler_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tarifler")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("icindekiler", (tbl) => {
      tbl.increments();
      tbl.string("icindekiler_adi");
    })
    .createTable("miktar", (tbl) => {
      tbl
        .integer("tarifler_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tarifler")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("adimlar_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("adimlar")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("icindekiler_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("icindekiler")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.integer("miktar");
      tbl.primary(["tarifler_id", "adimlar_id", "icindekiler_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("miktar")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("adimlar")
    .dropTableIfExists("tarifler");
};
