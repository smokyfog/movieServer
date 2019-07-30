const mongoose = require('./db')
const Schema = mongoose.Schema;

const User = new Schema({
    id: {
        type: String,
        required: true
    },
    appQqOpenId: {
        type: String,
        default:null
    },
    appWeiboUidP: {
        type: String,
        default:null
    },
    appWxOpenId: {
        type: String,
        default:null
    },
    birthday: {
        type: String,
        default:null
    },
    faceImage: {
        type: String,
        default: 'http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_8_qAIlFXAAAcIhVPdSg994.png'
    },
    isCertified: {
        type: Number,
        default:null
    },
    mpWxOpenId: {
        type: String,
        default:null
    },
    nickname: {
        type: String,
        default:null
    },
    registTime: {
        type: String,
        default:null
    },
    sex: {
        type: String,
        default:null
    },
    userUniqueToken: {
        type: String,
        default:null
    },
    username: {
        type: String,
        default:null
    },
    password: {
        type: String,
        default:null
    },
    type: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('User', User, 'user')