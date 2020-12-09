require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function searchByItemName(sT) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${sT}%`)
    .then((res) => {
      console.log(res);
    });
}

function paginateItems(p) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(6)
    .offset(6 * (p - 1))
    .then((res) => {
      console.log(`Page:${p}`);
      console.log(res);
    });
}

function productsAddedDaysAgo(dA) {
  knexInstance
    .select("id", "name", "price", "date_added", "checked", "category")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days':: INTERVAL`, dA)
    )
    .then((ress) => {
      console.log(`Products added ${dA} days Ago`);
      console.log(ress);
    });
}

function costPerCategory() {
  knexInstance
    .select("category")
    .sum("price as total")
    .from("shopping_list")
    .groupBy("category")
    .then((res) => {
      console.log(`Cost per Category`);
      console.log(res);
    });
}
