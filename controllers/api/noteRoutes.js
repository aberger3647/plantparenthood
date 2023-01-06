const router = require('express').Router();
const { Note } = require('../../models');
const withAuth = require('../../utils/auth');

// create note
router.post('/', withAuth, async (req, res) => {
  console.log(req.body)
  try {
    const newNote = await Note.create({
      note: req.body.note,
      user_id: req.session.user_id,
      plant_id: req.body.plant_id,
    });
    res.status(200).json(newNote);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete note
router.delete('/:id', withAuth, async (req, res) => {
  try{
    const noteData = await Note.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!noteData) {
      res.status(404).json({ message: 'No note found with this id! '});
    }
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;