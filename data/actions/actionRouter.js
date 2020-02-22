const db = require("../helpers/actionModel")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    db.get()
        .then((response) => {
            if(response) {
                return res.status(200).json(response)
            } else return res.status(404).json({ message: "Nothing was found." })
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

router.post("/", validateAction(), (req, res) => {
    db.insert(req.body)
        .then((response) => {
            if(response) {
                return res.status(201).json(response)
            } else return res.status(404).json({ message: "Project ID is not valid." })
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
})

router.put("/:id", validateAction(), (req, res) => {
    const id = req.params.id
    db.update(id, req.body)
        .then((response) => {
            if(response) {
                return res.status(200).json(response)
            } else return res.status(404).json({ message: "ID is not valid." })
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
                return res.status(404).json({ message: "ID is not valid." })
            } else return res.status(200).json({ message: "Successfully deleted!" })
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
})

function validateAction() {
    return (req, res, next) => {
        const { project_id, description, notes } = req.body
        if(!req.body) {
            return res.status(400).json({ message: "Missing required body." })
        }
        if(!project_id) {
            return res.status(400).json({ message: "Missing required project ID." })
        }
        if(!description) {
            return res.status(400).json({ message: "Missing required description." })
        }
        if(!notes) {
            return res.status(400).json({ message: "Missing required notes data." })
        }
        next()
    }
}

/*#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |*/

/*function get(id) {
  let query = db("actions");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then(action => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then(actions => {
      return actions.map(action => mappers.actionToBody(action));
    });
  }
}

function insert(action) {
  return db("actions")
    .insert(action)
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("actions")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("actions")
    .where("id", id)
    .del();
}*/

module.exports = router