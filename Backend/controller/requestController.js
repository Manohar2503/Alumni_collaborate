const RequestModel = require('../models/requestModel');

const requesting = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('Not authenticated');
        }
        
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        if (!toUserId || !status) {
            return res.status(400).send('Missing required parameters');
        }

        const connectionRequest = new RequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.status(200).json({
            message: "Request sent successfully",
            data
        });
    } catch (error) {
        res.status(400).send("Error occurred: " + error.message);
    }
};

module.exports = requesting;