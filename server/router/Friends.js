const express = require('express');
const router = express.Router();
const { create, retrieve, update, remove } = require('../services/Friends');

router.post('/create', async (req, res) => {
    const { name, age, description } = req.body;

    const results = await create(name, age, description);
    if (results) {
        res
            .status(200)
            .send({
                status: results,
                message: 'Created'
            });
    } else {
        res
            .status(500)
            .send({
                status: results,
                message: 'Failed'
            });
    }
});

router.post('/retrieve', async (req, res) => {
    const results = await retrieve();
    if (results) {
        res
            .status(200)
            .send(results);
    } else {
        res
            .status(500)
            .send({
                message: 'Failed'
            });
    }
});

router.put('/update', async (req, res) => {
    const { _id, obj } = req.body;

    const results = await update(_id, obj);
    if (results) {
        res
            .status(200)
            .send({
                status: results,
                message: 'Updated'
            });
    } else {
        res
            .status(500)
            .send({
                status: results,
                message: 'Failed'
            });
    }
});

router.delete('/remove', async (req, res) => {
    const { _id } = req.body;

    const results = await remove(_id);
    if (results) {
        res
            .status(200)
            .send({
                status: results,
                message: 'Deleted'
            })
    } else {
        res
            .status(500)
            .send({
                status: results,
                message: 'Failed'
            });
    }
});

module.exports = router;