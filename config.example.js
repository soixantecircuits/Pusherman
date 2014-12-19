module.exports = {
  // You can add any board you want
  boards: [
    {
      name: "A",
      pins: ["A0", 8]
    },
    {
      name: "B",
      pins: ["A1", 13]
    }
  ],
  osc: {
    address: 'localhost',
    port: 1337
  }
}