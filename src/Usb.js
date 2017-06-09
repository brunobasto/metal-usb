import Device from './Device';

/**
 * Class responsible for providing usb communication methods.
 */
class Usb {
	/**
	 * Lists available ports to communicate.
	 * @return {!Promise}
	 */
	static async getDevices() {
		const devices = await navigator.usb.getDevices();
		return devices.map(device => new Device({device}));
	}

	/**
	 * Attaches a 'connect' event to navigator.usb
	 * @return {!Event}
	 */
	static onConnect(handler) {
		return navigator.usb.addEventListener('connect', handler.bind(this));
	}

	/**
	 * Attaches a 'disconnect' event to navigator.usb
	 * @return {!Event}
	 */
	static onDisconnect(handler) {
		return navigator.usb.addEventListener('disconnect', handler.bind(this));
	}

	/**
	 * Requests port.
	 * @return {!Promise}
	 */
	static async requestDevice(options) {
		if (!options || !options.filters) {
			throw new Error('[Metal USB] You must specify some filters.');
		}
		try {
			return new Device({
				device: await navigator.usb.requestDevice(options)
			});
		}
		catch (e) {
			return null;
		}
	}
}

export default Usb;
