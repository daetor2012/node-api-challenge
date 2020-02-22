module.exports = (format) => {
	return (req, res, next) => {
		const { ip, method, url } = req
        const agent = req.get("User-Agent")
        const timestamp = Date.now()

		if (format === "short") {
			console.log(`${method} ${url}`)
		} else {
			console.log(`${ip} ${method} ${url} ${agent} ${timestamp}`)
		}
		
		next() 
	}
}