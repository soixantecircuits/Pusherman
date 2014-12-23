module.exports = {
  // You can add any board you want
  boards: [
    {
      id: "1",
      port: "/dev/ttyACM0"
      pins: ["A0", 8],
      enable: true
    },
    {
      id: "2",
      port: "/dev/ttyACM1"
      pins: ["A1", 13],
      enable: true
    }
  ],
  osc: {
    address: 'localhost',
    port: 1337
  },
  socketio: {
    address: 'localhost',
    port: 8080
  },
  mode: 'socketio'
}