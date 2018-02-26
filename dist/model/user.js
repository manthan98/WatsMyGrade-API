'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _course = require('./course');

var _course2 = _interopRequireDefault(_course);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map