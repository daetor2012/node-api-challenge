const express = require("express")
const server = express()
server.use(express.json())
const port = 4000
const logger = require("./middleware")
const actionRouter = require("./data/actions/actionRouter")
const projectRouter = require("./data/projects/projectRouter")
server.use(logger())
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.get("/", (req, res) => {
    return res.json({ message: "Server is up and running!" })
})
server.use("/api/actions", actionRouter)
server.use("/api/projects", projectRouter)

server.listen(port, () => {
    console.log(`Server running at localhost:${port}`)
})