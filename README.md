# Pusherman

#### Sending messages from a physical interface

This program is intended to send messages from a physical button. It sets analog pins to digital inputs, allowing you to cable as many buttons as your board has pins.

Right now it supports either OSC or socket.io

## Installation

### Arduino
Launch Arduino IDE and open File > Examples > Firmata > StandardFirmata and upload it to your board.

> NOTE: If you want internal pull-ups, you'll have to briefly modify this code.
Go to line 208 and change `LOW` to `HIGH`. (if you need it for ANALOG pins also, just do the same at line 200)

### JavaScript

```
npm install
```

This will install [johnny-five](https://github.com/rwaldron/johnny-five/),  [node-osc](https://github.com/TheAlphaNerd/node-osc) and [socket.io](http://socket.io).

You'll also need to configure your app by renaming the `config.example.js` file in `config.js` and fill it with your setup.

## Usage

```
npm start
```
