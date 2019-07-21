module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')

    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')

    router.get('/news/init', async (req, res) => {
        let parent = await Category.find({
            name: '新闻分类'
        })
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitle = ["游园惊梦甄姬手办，上线第一天就要免费送！", "《斗破苍穹手游》年度资料片“乱魂劫”上线，全新魂族激战大陆", "当代“英雄”生存现状解析，你差的就只是一件“神装”！", "王者荣耀×adidasneo这个夏天，与王者们一起好动集结！", "【内有福利】你已收到一封来自峡谷的甜Me情书", "7月16日全服不停机更新公告", "7月19日体验服停机更新公告", "心愿单升级完毕 功能已全面开放体验", "7月18日体验服停机更新公告", "7月17日全服不停机更新公告", "夏日盛典明日开启 惊喜福利拿到手软", "【稷下的神秘档案】活动公告", "当代“英雄”生存现状解析，你差的就只是一件“神装”！", "王者荣耀×adidasneo这个夏天，与王者们一起好动集结！", "小乔新皮清凉上线，Meco陪你感受可爱暴击！", "第七届王者荣耀城市赛海选金牛黄忠站即将开战！", "成功都是留给有准备的人，王者荣耀传奇选手Cat的崛起之路", "世冠首周战果出炉，eStarPro率先挺进八强", "倒计时一天！世冠小组赛明日12:00首尔开战", "阿泰vs伪装，花木兰solo谁输谁叫表哥"]
        const newsList = newsTitle.map(title => {
            let randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({})
        const resdata = await Article.insertMany(newsList)
        res.send(resdata)
    })

    router.get('/news/list', async (req, res) => {
        // let parent = await Category.find({
        //     name: '新闻分类'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()

        const newsparent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([{
                $match: {
                    parent: newsparent._id
                },
            },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: {$slice: ['$newsList', 5]}
                }
            }
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().populate('categories').limit(5).lean()
        })
        cats.map(cat=> {
            cat.newsList.map(news => {
                news.categoryName = cat.name==='热门'?news.categories[0].name:cat.name
                return news
            })
            return cat
        })

        res.send(cats)


    })

    router.get('/article/:id', async (req, res)=> {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: { $in: data.categories}
        }).limit(2)
        res.send(data)
    })

    app.use('/web/api', router)
}