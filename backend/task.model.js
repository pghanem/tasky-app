const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    task_description: {
        type: String
    },
    task_responsible: {
        type: String
    },
    task_priority: {
        type: String
    },
    task_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Task', Task);