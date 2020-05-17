var express = require('express');
var router = express.Router();
var models = require('../models');
var balanceRecord = models.balanceRecord;
var User = models.user;
//充值 提现审核
var responseData = {
    code: '',
    message: '',
}
router.get('/:id', async function(req, res, next) {
    // res.send('根据用户id查看余额记录');
    r = await balanceRecord.findAll({
        where: { uId: req.params.id },
        order: [
            ['time', 'DESC']
        ]
    });
    res.json(r)
});

router.post('/newin', async function(req, res, next) {
    // res.send('获取用户id，充值金额 提交充值审核');
    await balanceRecord.create({
        uId: req.body.id,
        money: req.body.money,
        operation: '充值',
        state: '未审核',
        time: new Date(),
    });
    responseData.code = 1;
    responseData.message = '充值申请提交成功，请耐心等待后台审核！！！';
    res.json(responseData);
});

router.post('/newout', async function(req, res, next) {
    // res.send('提交提现审核');
    await balanceRecord.create({
        uId: req.body.id,
        money: req.body.money,
        operation: '提现',
        state: '未审核',
        time: new Date(),
    });
    responseData.code = 2;
    responseData.message = '提现申请提交成功，请耐心等待后台审核！！！';
    res.json(responseData);
});

router.get('/pass/:id', async function(req, res, next) {
    // res.send('通过申请，1根据记录id，修改状态, 2更新账户余额');
    recod = await balanceRecord.findOne({
        where: { id: req.params.id, },
    });
    userInfo = await User.findOne({
        where: { id: recod.uId },
    });
    //修改状态
    // await balanceRecord.update({
    //         state: '通过',
    //     }, {
    //         where: { id: req.params.id, },
    //     })

    // 计算余额
    // if (recod.operation = '充值') {
    //     balance = userInfo.balance + recod.money;
    //     return balance;
    // }
    // if (recod.operation = '提现') {
    //     balance = userInfo.balance - recod.money;
    //     return balance;
    // }
    // // 更新账户余额
    // await User.update({
    //     balance: balance
    // }, {
    //     where: { id: recod.uId }
    // }).then(() => {
    //     responseData.code = 3;
    //     responseData.message = '已通过该' + recod.operation + '申请！！！';
    //     res.json(responseData);
    // })
});

router.get('/not/:id', async function(req, res, next) {
    // res.send('拒绝申请，1根据记录id，修改状态');
    await balanceRecord.update({
        state: '拒绝',
    }, {
        where: { id: req.params.id, },
    }).then(() => {
        responseData.code = 4;
        responseData.message = '已拒绝该' + recod.operation + '申请！！！';
        res.json(responseData);
    })
});

module.exports = router;