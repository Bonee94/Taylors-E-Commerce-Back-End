const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags including its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
// find a single tag by its `id` including its associated Product data
try {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  });

  if (!tagData) {
    res.status(404).json({ message: "No Tag found with that id." });

    return;
  }

  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

// create a new tag
router.post("/", async (req, res) => {
    /* req.body should look like this...
  {
    tag_name: "black"
  } 
  */

  Tag.create(req.body)
  .then((newTag) => {
    res.status(200).json(newTag);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }) 
  .then(async () => {
    const tag = await Tag.findByPk(req.params.id) 
    res.status(200).json(tag);
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagDelete) {
      res.status(404).json({message: 'No Tag found with that id.'});
      return;
    };
    
    res.status(200).json({message: "Tag deleted"});
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
