# Pusherman

#### Sending messages from a physical interface

This program is intended to send messages from a physical button. It sets analog pins to digital inputs, allowing you to cable as many buttons as your board has pins.

Right now it supports either OSC or socket.io

## Installation

### Arduino
Launch Arduino IDE and open File > Examples > Firmata > StandardFirmata and upload it to your board.

> NOTE: If you want internal pull-ups on analogs pins, you'll have to briefly modify this code.
Go to line 200 and change `LOW` to `HIGH`. (if you need it just for DIGITALS pins, [Johnny-Five can handle it](https://github.com/rwaldron/johnny-five/wiki/Button) )

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

## Example

This repo comes with a front-end basic example. To see it, launch pusherman in a terminal as explain above and, in another terminal window, go to the `example` subfolder in the main pusherman folder and type:
```
grunt
```
