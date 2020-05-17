var express = require('express');
var router = express.Router();
var models = require('../models');
var md5 = require('blueimp-md5');
const jwt = require('jwt-simple')
const moment = require('moment') // 时间格式化
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
router.post('/', async function(req, res, next) {
    res.send('我是用户api接口');
});

router.post('/register', async function(req, res, next) {
    let uName = req.body.uName;
    let password = md5(md5(req.body.password));
    // 用户名在数据库查找用户是否存在
    await User.findOne({
        where: { uName: uName },
    }).then((userInfo) => {

        // 存在
        if (userInfo) {
            responseData.code = 1;
            responseData.message = '该用户名已被注册！！！';
            res.json(responseData);
            return;
        }
    })
    await User.create({
            uName: uName,
            password: password,
        })
        .then(() => {
            responseData.code = 2;
            responseData.message = '恭喜您注册会员成功，请登陆体验!';
            res.json(responseData);
        })
    if (err) {
        responseData.code = 404;
        responseData.message = err;
        res.json(responseData);
        return;
    }
});

router.post('/login', async function(req, res, next) {
    let uName = req.body.uName;
    let password = md5(md5(req.body.password));
    // 用户名在数据库查找用户是否存在，存在对比密码，返回token，用户信息
    await User.findOne({
        where: { uName: uName },
    }).then((userInfo) => {
        if (!userInfo) {
            responseData.code = 1;
            responseData.message = '该用户不存在！！！';
            res.json({ responseData });
            return;
        }
        // 生成 token 用户标识
        const token = jwt.encode({
                iss: userInfo.id, // 签发的用户 id 标识u
                exp: moment().add('days', 7).valueOf() // token 过期时间 7 天
            }, 'itcast')
            //对比密码
        if (!(userInfo.password === password)) {
            responseData.code = 2;
            responseData.message = '用户密码不正确！！！请重新输入';
            res.json({ responseData });
            return;
        }
        if (userInfo.password === password) {
            responseData.code = 3;
            responseData.message = '登陆成功，欢迎！！！';
            userInfo.password = ''
            userInfo.balance = ''
            res.json({ token, responseData, userInfo });
            return;
        }
    })
    if (err) {
        responseData.code = 404;
        responseData.message = err;
        res.json(responseData);
        return;
    }
});

router.post('/update', async function(req, res, next) {
    let id = req.body.id;
    let uName = req.body.uName;
    let password = md5(md5(req.body.password));

    //检测用户名是否改变
    await User.findOne({
            where: { id: id },
        })
        .then(async(userInfo) => {
            if (userInfo.uName === uName) {
                await User.update({
                    password: password
                }, {
                    where: { id: id }
                });
                //生成新的token
                const token = jwt.encode({
                    iss: userInfo.id, // 签发的用户 id 标识u
                    exp: moment().add('days', 7).valueOf() // token 过期时间 7 天
                }, 'itcast')
                responseData.code = 1;
                responseData.message = '修改用户密码成功！！！';
                userInfo.password = '';
                newuserInfo.balance = '';
                res.json({ token, responseData, userInfo });
                return;
            }
            //用户名修改了
            await User.findOne({
                where: { uName: uName },
            }).then(async(userInfo) => {
                // 存在同名
                if (userInfo) {
                    responseData.code = 2;
                    responseData.message = '修改失败，该用户名已被注册！！！';
                    res.json({ responseData });
                    return;
                }
            })
            await User.update({
                uName: uName,
                password: password
            }, {
                where: { id: id }
            })
            await User.findOne({
                where: { uName: uName },
            }).then((newuserInfo) => {
                //生成新的token
                const token = jwt.encode({
                    iss: newuserInfo.id, // 签发的用户 id 标识u
                    exp: moment().add('days', 7).valueOf() // token 过期时间 7 天
                }, 'itcast')
                responseData.code = 3;
                responseData.message = '修改用户信息成功！！！';
                newuserInfo.password = '';
                newuserInfo.balance = '';
                res.json({ token, responseData, newuserInfo });
            })
        });
});

router.get('/balance', async function(req, res, next) {
    // res.send('获取该用户余额');
    u = await User.findOne({
        where: { id: req.query.id },
    });
    res.json(u.balance);
});

//用户注销
router.get('/delUser/:id', async function(req, res, next) {
    // res.send('删除用户,解决外键冲突 先删除余额记录，提交内容，任务');
    id = req.params.id;
    await balanceRecord.destroy({
        where: { uId: id },
    })
    await Submit.destroy({
        where: { uId: id },
    })
    await Task.destroy({
        where: { uId: id },
    })
    await User.destroy({
        where: { id: id },
    })
    responseData.code = 6;
    responseData.message = '删除id为' + id + '的用户所有数据成功！！！'
    res.json(responseData)
});

module.exports = router;