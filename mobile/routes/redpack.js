var express = require('express');
var router = express.Router();
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
router.get('/:id', async function(req, res, next) {
    // res.send('我是红包接口');
});

router.get('/pass/:id', async function(req, res, next) {
    // res.send('通过, 1根据提交id获取任务，2根据任务模式生成普通红包或随机红包，3生成新的余额记录');
    s = await Submit.findOne({
        where: { id: req.params.id }
    })
    t = await Task.findOne({
        where: { id: s.tId }
    })

    // 统计提交同任务已通过人数
    doneNum = await Submit.count({
        where: {
            tId: s.tId,
            state: ['通过'],
        }
    })

    //求剩余人数
    remain_num = t.people - doneNum;

    //求已瓜分红包总额
    redpackSum = await Submit.sum('redpack', {
        where: {
            tId: s.tId,
            state: ['通过'],
        }
    })

    //求剩余红包
    remain_total = t.money - redpackSum;

    if (t.model) {
        //调用红包算法，求出一个新的红包值
        if (remain_num === 1) {
            value = remain_total; //剩余人数为1，直接取剩余的钱生成红包
        } else {
            min = 0.01;
            max = remain_total / remain_total * 2; // 二倍均值法
            value = Math.random() * max; //生成随机数
            value = value < min ? min : value; //随机数小于0.01则取0.01，大于则取原来的值
            value = Math.round(value * 100) / 100; //保存两位小数
        }
    } else {
        //求平均值
        value = t.money / t.people
    }
    // res.json(value);

    //更新红包，状态
    await Submit.update({
        state: '通过',
        redpack: value,
    }, {
        where: { id: req.params.id }
    })

    //生成新的余额记录
    await balanceRecord.create({
        uId: s.uId,
        money: value,
        operation: '完成任务',
        state: '',
        time: new Date(),
    });

    responseData.code = 1;
    responseData.message = '用户提交内容合格，通过';
    res.json(responseData)
});

router.get('/not/:id', async function(req, res, next) {
    // res.send('拒绝');
    id = req.params.id;
    await Submit.update({
        state: '拒绝',
    }, {
        where: { id: id }
    })
    responseData.code = 2;
    responseData.message = '不给改用户通过';
    res.json(responseData)
});



// //生成随机红包函数
// function average(remain_total, remain_num) { //定义参数剩余总额，剩余人数，
//     if (remain_num === 1) {
//         value = remain_total; //剩余人数为1，直接取剩余的钱生成红包
//     } else {
//         const min = 0.01;
//         let max, value;
//         max = remain_total / remain_total * 2; // 二倍均值法
//         value = Math.random() * max; //生成随机数
//         value = value < min ? min : value; //随机数小于0.01则取0.01，大于则取原来的值
//         value = Math.round(value * 100) / 100; //保存两位小数
//     }
//     return value;
//     // console.log('第{}个人抢到{}元红包，剩余红包{}元'.format(num + 1, value, amount));
// }

module.exports = router;