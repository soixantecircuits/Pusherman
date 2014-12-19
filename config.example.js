module.exports = {
  // You can add any board you want
  boards: [
    {
      name: "A",
      port: "/dev/ttyACM0"
      pins: ["A0", 8]
    },
    {
      name: "B",
      port: "/dev/ttyACM1"
      pins: ["A1", 13]
    }
  ],
  osc: {
    address: 'localhost',
    port: 1337
  }
}