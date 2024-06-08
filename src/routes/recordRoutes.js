const {Router} = require("express");
const Record = require("../models/record");

const router = Router();

// Create Record
router.post('/records', async (req, res) => {
    const newRecord = new Record(req.body);
    try {
        await newRecord.save();
        res.status(201).json({
            code: 201,
            message: 'Record created successfully',
            data: newRecord
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: 'Failed to create record',
            data: null,
            error: error.message
        });
    }
});

// Get All Records
router.get('/records', async (req, res) => {
    try {
        const records = await Record.find();
        res.json({
            code: 200,
            message: 'Records retrieved successfully',
            data: records
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to retrieve records',
            data: null,
            error: error.message
        });
    }
});

// Update Record
router.put('/records/:id', async (req, res) => {
    try {
        const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            code: 200,
            message: 'Record updated successfully',
            data: updatedRecord
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: 'Failed to update record',
            data: null,
            error: error.message
        });
    }
});

// Delete Record
router.delete('/records/:id', async (req, res) => {
    try {
        await Record.findByIdAndDelete(req.params.id);
        res.json({
            code: 200,
            message: 'Record deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to delete record',
            data: null,
            error: error.message
        });
    }
});

module.exports = router;