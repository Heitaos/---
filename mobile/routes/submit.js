var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;
var Task = models.task;
var Submit = models.submit;

//返回数据格式
var responseData = {
    code: '',
    message: '',
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('我是提交内容api接口');
});

router.post('/save', async function(req, res, next) {
    // res.send('保存提交内容');
    let tId = req.body.tId;
    let uId = req.body.uId;
    let context = req.body.context;
    let shotcut = req.body.shotcut;
    await Submit.create({
        tId: tId,
        uId: uId,
        context: context,
        shotcut: shotcut,
    }).then(() => {
        responseData.code = 1;
        responseData.message = '已成功提交内容，请耐心等待发布者审核。。。';
        res.json(responseData);
    })
    if (err) {
        responseData.code = 404;
        responseData.message = err;
        res.json(responseData);
        return;
    }
});

router.get('/submitlist/:id', async function(req, res, next) {
    // 获取提交该任务内容,未审核的用户信息表
    tId = req.params.id
    submit = await Submit.findAll({
        attributes: ['id', 'uId'],
        include: [{
            model: User,
            attributes: ['uName'],
        }],
        where: {
            tId: tId,
        },
    });
    res.json(submit)
});

router.get('/submitcontext/:id', async function(req, res, next) {
    // 获取提交该任务内容
    id = req.params.id
    submitdetail = await Submit.findOne({
        include: [{
            model: User,
            attributes: ['uName'],
        }, {
            model: Task,
            attributes: ['title'],
        }],
        where: { id: id },
    });
    res.json(submitdetail)
});

router.get('/getlist/:id', async function(req, res, next) {
    // res.send('获取该用户未审核');
    s = await Submit.findAll({
        attributes: ['id', 'redpack'],
        include: [{
            model: Task,
            attributes: ['title', 'cover'],
            order: [
                ['id', 'DESC']
            ]
        }],
        where: {
            state: '未审核',
            uId: req.params.id,
        }
    });
    res.json(s)
});

router.get('/getpasslist/:id', async function(req, res, next) {
    // res.send('获取通过列表');
    s = await Submit.findAll({
        attributes: ['id', 'redpack'],
        include: [{
            model: Task,
            attributes: ['title', 'cover'],
            order: [
                ['id', 'DESC']
            ]
        }],
        where: {
            state: '通过',
            uId: req.params.id,
        }
    });
    res.json(s)
});

router.get('/getnotlist/:id', async function(req, res, next) {
    // res.send('获取拒绝列表');
    s = await Submit.findAll({
        attributes: ['id', 'redpack'],
        include: [{
            model: Task,
            attributes: ['title', 'cover'],
        }],
        where: {
            state: '拒绝',
            uId: req.params.id,
        },
        order: [
            ['id', 'DESC']
        ]
    });
    res.json(s)
});

module.exports = router;