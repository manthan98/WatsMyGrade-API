'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _course = require('./course');

var _course2 = _interopRequireDefault(_course);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var GradeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mark: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

module.exports = _mongoose2.default.model('Grade', GradeSchema);
//# sourceMappingURL=grade.js.map