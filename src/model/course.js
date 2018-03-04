import mongoose from 'mongoose';
import User from './user';
import Grade from './grade';

let Schema = mongoose.Schema;
let CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    average: Number,
    grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }]
});

module.exports = mongoose.model('Course', CourseSchema);