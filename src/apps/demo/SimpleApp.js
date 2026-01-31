
export default class SimpleApp {
	constructor(props) {
		this.title = props.title || 'Simple'
	}
	async run() {
		// Simulate async
		await new Promise(resolve => setTimeout(resolve, 10))
		return {
			content: [
				{ Typography: ['SimpleApp: ' + this.title], $variant: 'h3' },
				{ Typography: ['Standard rendering'], $variant: 'body' },
			],
		}
	}
}
