var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;
var Task = models.task;
var Submit = models.submit;
var balanceRecord = models.balanceRecord;
var moment = require('moment'); //时间格式化

//后台管理模板引擎控制
/* GET home page. */
//用户管理
router.get('/', async function(req, res, next) {
    allUser = await User.findAll({
        'attributes': ['id', 'uName', 'balance'],
    });
    res.render('index', { res: allUser });
});

// 登陆
router.get('/login', function(req, res, next) {
    res.render('login');
});
// 注册
router.get('/register', function(req, res, next) {
    res.render('register');
});


//任务管理
router.get('/task', async function(req, res, next) {
    allTask = await Task.findAll({
        include: [{
            model: User,
            attributes: ['uName'],
        }],
        order: [
            ['id', 'DESC']
        ]
    });
    // res.json(allTask)
    res.render('task', { res: allTask, moment: moment });
});
// 充值
router.get('/in', async function(req, res, next) {
    allin = await balanceRecord.findAll({
        where: { operation: '充值' },
        include: [{
            model: User,
            attributes: ['uName'],
        }],
        order: [
            ['time', 'DESC']
        ]
    });
    // res.json(allin)
    res.render('in', { res: allin, moment: moment });
});
// 提现
router.get('/out', async function(req, res, next) {
    allout = await balanceRecord.findAll({
        where: { operation: '提现' },
        include: [{
            model: User,
            attributes: ['uName'],
        }],
        order: [
            ['time', 'DESC']
        ]
    });
    res.render('out', { res: allout, moment: moment });
});
// 个人中心
router.get('/myinfo', function(req, res, next) {
    res.render('myinfo');
});

router.post('/preview', async function(req, res, next) {
    // res.send('图片预览');

});

module.exports = router;