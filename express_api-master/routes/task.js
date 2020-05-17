var express = require('express');
var router = express.Router();

//users接口配置

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('我是用户管理接口');
});

module.exports = router;