'use strict';

window.soy = window.soy || goog.soy;
window.soy.asserts = window.soy.asserts || {
    assertType: (a, b, c, d) => c
};

import Component from 'metal-component';
import { CancellablePromise } from 'metal-promise';
import templates from './LedMatrix.soy.js';
import Soy from 'metal-soy';

/**
 * Class responsible for rendering a Led Matrix on the screen.
 */
class LedMatrix extends Component {
    sendData(data) {
        return this.device
            .write(data)
            .catch((error) => {
                throw error
            });
    }

    clear() {
        this.sendData(' \n').then(() => {
            this.data.rows.map((row, rowIndex) => {
                return row.map((led, colIndex) => {
                    return {
                        r: 0,
                        g: 0,
                        b: 0
                    };
                });
            });
            this.data = this.data;
        });
    }

    updateIntensity(event) {
        let message = '';
        const intensity = event.target.value;
        this.data.rows.map((row, rowIndex) => {
            return row.map((led, colIndex) => {
                led.r = intensity; led.g = intensity; led.g = intensity;
                message += `${rowIndex} ${colIndex} ${led.r} ${led.g} ${led.b}\n`;
                return led;
            });
        });
        this.sendData(message);
        this.data = this.data;
    }

    onClickLed(event) {
        const rowIndex = event.target.dataset.row;
        const colIndex = event.target.dataset.column;
        const led = this.data.rows[rowIndex][colIndex];

        console.log(rowIndex, colIndex);

        led.r = led.r > 0 ? 0 : 255;
        led.g = led.g > 0 ? 0 : 255;
        led.b = led.b > 0 ? 0 : 255;

        console.log('message:', `${rowIndex} ${colIndex} ${led.r} ${led.g} ${led.b}`);

        this.sendData(`${rowIndex} ${colIndex} ${led.r} ${led.g} ${led.b}\n`);
        this.data = this.data;
    }

    connectToDevice(device) {
        device.connect(1, 2)
            .then(() => {
                this.device = device;
                this.offline = false;
            })
            .catch((error) => {
                this.offline = true;
            });
    } 
}

LedMatrix.STATE = {
    device: {

    },
    data: {
        value: {
            rows: []
        }
    },
    offline: {

    }
};

Soy.register(LedMatrix, templates);

export default LedMatrix;
