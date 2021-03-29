
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pods').del()
    .then(() => {
      return knex('pods').insert([
        { id: 10, label: 'pod1', host: "147.123.123.123", port: "8080", oas: JSON.stringify({ desc: "specification" }) },
        { id: 20, label: 'pod2', host: "147.123.123.124", port: "8080", oas: JSON.stringify({ desc: "specification" }) },
        { id: 30, label: 'pod3', host: "147.123.123.125", port: "8080", oas: JSON.stringify({ desc: "specification" }) },
        { id: 40, label: 'pod4', host: "147.123.123.126", port: "8080", oas: JSON.stringify({ desc: "specification" }) },
      ])
    })
}