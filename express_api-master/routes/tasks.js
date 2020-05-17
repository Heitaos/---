var express = require('express');
var router = express.Router();
var sequelize = require('sequelize')
var Op = sequelize.Op;
var models = require('../models');
var User = models.user;
var Task = models.task;
var Submit = models.submit;
var balanceRecord = models.balanceRecord;

//返回数据格式
var responseData = {
        code: '',
        message: '',
    }
    /* GET users listing. */
router.get('/', async function(req, res, next) {
    res.send('任务接口');
});

router.post('/save', async function(req, res, next) {
    // res.send('保存任务');
    let uId = req.body.uId;
    let title = req.body.title;
    let cover = req.body.cover;
    let context = req.body.context;
    let people = req.body.people;
    let money = req.body.money;
    let model = req.body.model;
    let time = new Date();
    let state = req.body.state;
    // 创建新的任务
    await Task.create({
        uId: uId,
        title: title,
        cover: cover,
        context: context,
        people: people,
        money: money,
        model: model,
        time: time,
        state: state,
    })
    if (state === '发布') {
        userInfo = await User.findOne({
            where: { id: uId },
        });

        //发布成功，计算余额，更新账户余额
        balance = userInfo.balance - money;
        await User.update({
            balance: balance
        }, {
            where: { id: uId }
        })

        //生成新的余额记录
        await balanceRecord.create({
            uId: uId,
            money: money,
            operation: '发布任务',
            time: new Date(),
        });

        responseData.code = 1;
        responseData.message = '任务发布成功！！！';
        res.json(responseData);
    }
    if (state === '草稿') {
        responseData.code = 2;
        responseData.message = '草稿保存成功！！！';
        res.json(responseData);
    }
    if (err) {
        responseData.code = 404;
        responseData.message = err;
        res.json(responseData);
        return;
    }
});

router.post('/change', async function(req, res, next) {
    // res.send('更新草稿');
    let id = req.query.id;
    let uId = req.body.uId;
    let title = req.body.title;
    let cover = req.body.cover;
    let context = req.body.context;
    let people = req.body.people;
    let money = req.body.money;
    let model = req.body.model;
    let time = new Date();
    let state = req.body.state;
    // 创建新的任务
    await Task.update({
        uId: uId,
        title: title,
        cover: cover,
        context: context,
        people: people,
        money: money,
        model: model,
        time: time,
        state: state,
    }, {
        where: { id: id }
    })
    if (state === '发布') {
        userInfo = await User.findOne({
            where: { id: uId },
        });

        //发布成功，计算余额，更新账户余额
        balance = userInfo.balance - money;
        await User.update({
            balance: balance
        }, {
            where: { id: uId }
        })

        //生成新的余额记录
        await balanceRecord.create({
            uId: uId,
            money: money,
            operation: '发布任务',
            time: new Date(),
        });

        responseData.code = 3;
        responseData.message = '任务发布成功！！！';
        res.json(responseData);
    }
    if (state === '草稿') {
        responseData.code = 4;
        responseData.message = '草稿保存成功！！！';
        res.json(responseData);
    }
    if (err) {
        responseData.code = 404;
        responseData.message = err;
        res.json(responseData);
        return;
    }
});

router.get('/getlist/hot', async function(req, res, next) {
    // res.send('按热度排行获取以发布任务列表');
    t = await Task.findAll({
        where: {
            state: '发布'
        },
        order: [
            ['hot', 'DESC']
        ]
    });
    res.json(t);
});

router.get('/getlist/time', async function(req, res, next) {
    // res.send('按热度时间排行获取以发布任务列表');
    t = await Task.findAll({
        where: {
            state: '发布'
        },
        order: [
            ['time', 'DESC']
        ]
    });
    res.json(t);
});

router.get('/getDetail/:id', async function(req, res, next) {
    // res.send('根据任务id获取以发布某任务详情');
    id = req.params.id;
    t = await Task.findOne({
        where: { id: id }
    });
    // 发布者信息
    u = await User.findOne({
        where: { id: t.uId },
    })

    // 统计未审核和通过人数
    doneNum = await Submit.count({
        where: {
            tId: id,
            state: ['未审核', '通过'],
        }
    })
    res.json({ t, uName: u.uName, doneNum: doneNum });
});

router.get('/released/:id', async function(req, res, next) {
    // res.send('根据用户id获取该用户的任务列表');
    let uId = req.params.id;
    tasklist = await Task.findAll({
        'attributes': ['id', 'cover', 'title'],
        where: { uId: uId, state: '发布' },
        order: [
            ['time', 'DESC']
        ]
    });
    res.json(tasklist)
});

router.get('/draft/:id', async function(req, res, next) {
    // res.send('根据用户id获取该用户的草稿任务列表');
    let uId = req.params.id;
    draftlist = await Task.findAll({
        'attributes': ['id', 'cover', 'title'],
        where: { uId: uId, state: '草稿' },
        order: [
            ['time', 'DESC']
        ]
    });
    res.json(draftlist)
});

router.get('/draftdetail/:id', async function(req, res, next) {
    // res.send('根据任务id获取该草稿详情');
    let id = req.params.id;
    draftdetail = await Task.findOne({
        where: { id: id },
    });
    res.json(draftdetail)
});

router.get('/rehot/:id&:hot', async function(req, res, next) {
    // res.send('根据任务id更新热度');
    await Task.update({
        hot: req.params.hot,
    }, {
        where: { id: req.params.id }
    })

    responseData.code = 5;
    responseData.message = '更新热度成功';
    res.json(responseData)
});

router.get('/delTask/:id', async function(req, res, next) {
    // res.send('删除用户,解决外键冲突 先删除提交内容');
    id = req.params.id;
    await Submit.destroy({
        where: { tId: id },
    })
    await Task.destroy({
        where: { id: id },
    })
    responseData.code = 6;
    responseData.message = '下架该违规任务成功成功！！！'
    res.json(responseData)
});

router.get('/search', async function(req, res, next) {
    // res.send('模糊搜索 1查找任务标题，内容含有搜索内容结果 2 返回任务列表');
    con = req.query.con;

    var result = await Task.findAll({
        order: [
            ['time', 'DESC']
        ],
        where: {
            [Op.or]: [{
                title: {
                    [Op.like]: '%' + con + '%'
                }
            }, {
                context: {
                    [Op.like]: '%' + con + '%'
                }
            }],
            state: '发布'
        }
    });

    res.json(result)
});

module.exports = router;