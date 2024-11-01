const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema(
    {
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect message type`
        },
    }, 
    },
    {timestamps: true}
)

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Connection Request cannot be sent to yourself !")
    }

    next();
})
const connectionRequestModel = new mongoose.model("Connection Request", connectionRequestSchema);
module.exports = connectionRequestModel;