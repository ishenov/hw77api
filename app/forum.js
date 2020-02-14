const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const db = require('../fileDb');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

const router = express.Router();

router.get('/', (req, res) => {
	res.send(db.getItems());
});

router.post('/', upload.single('image'), (req, res) => {
	const comment = req.body;
	if (!comment.message) {
		res.status(400).send('Message field required !')
	} else {
		comment.id = nanoid();
		if (req.file) {
			comment.image = req.file.filename;
		}
		db.addItem(comment);
		res.send(comment);
	}
});

module.exports = router;