const koa=require('koa');
const app=new koa();
const mysql=require('mysql');
const Router=require('koa-router');
const koaBody = require('koa-body')
const router=new Router();
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

// app.use(async ctx => {
//     ctx.body = 'Hello World';
// });

router.get('/',async (ctx)=>{
    ctx.body='node mysql';
});
const rbody={
    code:0,
    data:{},
    msg:''
}
const db=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'nodemysqol'
})
db.connect((err)=>{
    err&&(()=>{
        throw err
    })();
    console.log('连接成功')
});
router.get('/createdb',async (ctx)=>{
    console.log(789)
    let sql='CREATE DATABASE nodemysqol';
    db.query(sql,(err,result)=>{

        err?(()=>{
            console.log(err)
        })():(()=>{
            console.log(result)
            res.end('database create success');
            ctx.body='success';
        })();
    })
});
router.get('/createPost',async (ctx)=>{
    let sql='CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(225),PRIMARY KEY(ID))';
    db.query(sql,(err,res)=>{
        err&&console.log(err);
        res&&(()=>{
            ctx.body='create success'
        })();
    })
})
router.get('/addPost',async (ctx)=>{
    console.log(7777)
    let post=['1111','222222']
    let sql='INSERT INTO posts (title,body) VALUES (?,?) ';
    db.query(sql,post,(err,res)=>{
        console.log(res,9999)
        err&&console.log(err);
        res&&(()=>{
            ctx.body='success'
        })();
    })
})
router.get('/getPost',async (ctx)=>{
    let sql='SELECT * FROM posts';
    db.query(sql,(err,res)=>{
        err&&console.log(err);
        res&&(()=>{
            ctx.body=res;
            console.log(res,789)
        })();
    })

});
router.post('/utopa/ar/access/login',koaBody(),async (ctx)=>{
    //console.log(ctx);
    console.log(JSON.stringify(ctx.request.body));
    let loginName=ctx.request.body.loginName;
    let password=ctx.request.body.password;
    console.log(loginName,password,777777)
    if(loginName&&password){
        let sql="SELECT * FROM user where loginName ="+JSON.stringify(loginName);
        let result=await query(sql);
        console.log(result,789);
        result.length?(()=>{
            let apple=JSON.parse(JSON.stringify(result));
            console.log(apple,999);
            password==apple[0].password?(()=>{
                rbody.msg='success'
                rbody.code=0;
                ctx.body=rbody;
            })():(()=>{
                rbody.msg='密码错误'
                rbody.code=1;
                ctx.body=rbody;
            })();
        })():(()=>{
            rbody.msg='不存在该用户'
            rbody.code=1;
            ctx.body=rbody;
        })();
    }else {
        rbody.msg='用户名密码不能为空'
        rbody.code=1;
        ctx.body=rbody;
    }
});
const query = function (sql) {
    return new Promise((resolve, reject) => {
        db.query(sql,function (error, results) {
            if(error){
                reject(error);
            }else{
                resolve(results)
            }
        });
    })
}

