'use strict';

import State from 'metal-state';

/**
 * Class responsible for providing usb communication methods.
 */
class Device extends State {
    /**
	 * Connects to Device.
	 * @return {!Promise}
	 */
	connect(configuration, _interface) {
        return this.device.open()
            .then(() => {
                if (this.device.configuration === null) {
                    return this.device.selectConfiguration(configuration);
                }
            })
            .then(() => this.device.claimInterface(_interface));
    }

    /**
	 * Disconnects to port.
	 * @return {!Promise}
	 */
    disconnect() {
         return this.device.close();
    }

    getName() {
        return this.getProperty('productName');
    }

    getProperty(property) {
        return this.device[property];
    }

    /**
	 * Sends data
	 * @return {!Promise}
	 */
    write(data) {
        let textEncoder = new TextEncoder();
        return this.device.transferOut(4, textEncoder.encode(data));
        // return this.device.controlTransferOut({
        //     'requestType': 'vendor',
        //     'recipient': 'device',
        //     'request': 0x01,
        //     'value': 0x00,
        //     'index': 0x00
        // }, textEncoder.encode(data));
    }

    read(size) {
        let textDecoder = new TextDecoder();
        return this.device
            .transferIn(5, size)
            .then(result => textDecoder.decode(result.data));
    }
}

Device.STATE = {
    device: {

    },
    name: {

    }
};

export default Device;
