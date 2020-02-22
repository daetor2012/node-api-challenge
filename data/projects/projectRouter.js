const db = require("../helpers/projectModel")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    db.get()
        .then((response) => {
            if(response) {
                return res.status(200).json(response)
            } else return res.status(404).json({ message: "No projects were found." })
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    db.get(id)
        .then((response) => {
            if(response) {
                return res.status(200).json(response)
            } else return res.status(404).json({ message: "ID does not exist." })
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
})

router.post("/", validateProject(), (req, res) => {
    db.insert(req.body)
        .then((response) => {
            return res.status(201).json(response)
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
})

router.put("/:id", validateProject(), (req, res) => {
    const id = req.params.id
    db.update(id, req.body)
        .then((response) => {
            if(response === null) {
                return res.status(400).json({ message: "ID does not exist." })
            } else return res.status(200).json(response)
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    db.remove(id)
        .then((response) => {
            if(!response) {
                return res.status(404).json({ message: "ID does not exist." })
            } else return res.status(200).json({ message: "Project successfully deleted!" })
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
})

router.get("/actions/:id", (req, res) => {
    const id = req.params.id
    db.getProjectActions(id)
        .then((response) => {
            if(response.length === 0) {
                return res.status(404).json({ message: "Project ID does not exist." })
            } else return res.status(200).json(response)
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
})
function validateProject() {
    return (req, res, next) => {
        const { name, description } = req.body
        if(!req.body) {
            return res.status(400).json({ message: "Missing required body." })
        }
        if(!name) {
            return res.status(400).json({ message: "Missing required name." })
        }
        if(!description) {
            return res.status(400).json({ message: "Missing required description." })
        }
        next()
    }
}

module.exports = router