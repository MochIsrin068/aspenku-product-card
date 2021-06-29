import queryString from 'query-string'

const BASE_URL_ = process.env.REACT_APP_API_BASE_URL
const BASE_URL_CORE = process.env.REACT_APP_API_BASE_URL_CORE

export default class API {
	static listProduct = () => {
		const payload = this.cleanPayload({
			limit :100,
			skip: 0,
			price: `{"min":"1","max":"1000"}`,
		})
		return this.fetch(`product?${queryString.stringify(payload)}`, null, BASE_URL_)
	}

	static detailProduct = (permaLink) => {
		return this.fetch(`product/${permaLink}`, {}, BASE_URL_CORE)
	}

	static fetch = async (uri, config, BASE_URL) => {
		const defaultConfig = {
			headers: {
				Accept: 'application/json',
				authorization:"Basic QXNwZW5rdTpBc3Blbmt1",
				language:"en"
			},
		}

		const mergeConfig = { ...defaultConfig, ...config }
		let bodyConfig = {}
		if (mergeConfig.body && !(mergeConfig.body instanceof FormData)) {
			const form = new FormData()
			Object.entries(mergeConfig.body).map(([label, value]) => {
				if (Array.isArray(value)) {
					value.map((each, index) => {
						if (typeof each === 'object') {
							Object.keys(each).map(key => {
								form.append(`${label}[${index}][${key}]`, each[key])
								return true
							})
						} else {
							form.append(`${label}[]`, each)
						}
						return true
					})
				} else {
					form.append(label, value)
				}

				return true
			})
			bodyConfig = { body: form }
		}
		const cleanConfig = { ...mergeConfig, ...bodyConfig }
		const url = `${BASE_URL}/${uri}`
		return fetch(url, cleanConfig)
			.then(res => {
				if (res.status !== 200) {
					if (this.component) {
						let { errorAPI } = this.component.state
						if (!errorAPI) {
							errorAPI = new Map()
						}
						errorAPI.set(uri, res.statusText)
						this.component.setState({ errorAPI: errorAPI })
					}
				}
				return res.json()
			})
			.catch(err => {
				console.log('error', err)
			})
	}

	static cleanPayload = payload => {
		Object.keys(payload).forEach(key => payload[key] == null && delete payload[key])
		return payload
	}
}
