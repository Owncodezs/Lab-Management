const express = require('express')
const path = require("path")
const session =require("express-session")
const cookieparser=require("cookie-parser")
const bodyParser = require('body-parser');
const { createPool } = require('mysql');
const mysql = require('mysql')


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lab_management",
    connectionLimit: 20
})
const ejsMate = require('ejs-mate');
const { release } = require('os');
const { name } = require('ejs');

const port = 3000


const app = express()
// app.use(express.static(path.join(__dirname, "/public")))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser())
app.use(session({
    secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

//---------------------------------------------------------------------------------------------------------

//-------------------------------eddw---------------------------------------------------------------------------
//log out
app.get('/logout',(req,res)=>{
    req.session.destroy();
    // req.session.adminlogin=false;
    // req.session.userlogin=false;
    // console.log(req.session.adminlogin)
    res.render('home.ejs')
   
    
})
//home page
app.get('/',(req,res)=>{
    console.log("home")
    res.render('home.ejs')
    
})
//admin login
app.get('/admin/login',(req,res)=>{
   res.render('admin_login.ejs')
  
})
//user locin
app.get('/user/login',(req,res)=>{
    
    res.render('user_login.ejs')
  
})
app.post('/admin/login', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {fmuser,fmpass,fmtype}=req.body
    console.log('data',fmuser,fmpass,fmtype); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `select * from dbmanagement_login where user_id = '${fmuser}'  AND pass= '${fmpass}' `;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else if( rows[0].pass==fmpass ) {
                    req.session.adminlogin=true;
                    req.session.adminname=fmuser;
                    res.redirect('/admin/space')
                }
                else{  
                    res.redirect('/admin/space')
                }
            })
        } 
    })

})
app.post('/user/login', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {fuser,fpass,ftype}=req.body
    console.log('data',fuser,fpass,ftype); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `select * from user where u_id = '${fuser}'  AND u_pass= '${fpass}' AND u_type= '${ftype}'`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else if( rows[0].pass=fpass ) {
                    req.session.userlogin=true;
                    req.session.username=fuser;
                    //console.log(rows[0].type)
                    res.redirect('/user/space')
                } 
                else{   
                    res.redirect('/login')
                }
            })
        }
    })

})

///---------------------------------------------------------------------------------------
//admin space
app.get('/admin/space',(req,res)=>{
    if(req.session.adminlogin){
    console.log("admin_login")
    res.render('admin_space.ejs')
    }
    else{
        console.log("pls login as admin");
        res.render('admin_login.ejs');
    }
}) 

app.get('/updatelab',(req,res)=>{
    if(req.session.adminlogin){
        console.log("admin_login@update")
        pool.getConnection((err, result) => {
            if (err) console.log(err.message)
            else {
                staffdata="";
                var sql = `select * from staff_information;`
                result.query(sql, (err, data, fiels) => {
                    if (err) console.log(err)
                    staffdata=data
                })
                console.log('student connected')
                console.log(result)
                var sql = `select * from lab;`
                result.query(sql, (err, labdata, fiels) => {
                    if (err) console.log(err)
                    else {
                        console.log(labdata)
                        result.release()
                        res.render('update_lab.ejs', { labdata,staffdata })
    
                    }
                })
            }
        })
    
        }
        else{
            console.log("pls login as admin");
            res.render('admin_login.ejs');
        }
    
    
}) 
 
app.get('/newlab',(req,res)=>{
    if(req.session.adminlogin){
        console.log("admin_login@newlab")
        pool.getConnection((err, result) => {
            if (err) console.log(err.message)
            else {
                console.log('student connected')
                console.log(result)
                var sql = `select * from staff_information;`
                result.query(sql, (err, data, fiels) => {
                    if (err) console.log(err)
                    else {
                        console.log(data)
                        result.release()
                        res.render('new_lab.ejs', { data })
    
                    }
                })
            }
        })
        }
        else{
            console.log("pls login as admin");
            res.render('admin_login.ejs');
        }
       
}) 
//----------------------------------------------------
//Select a labe
app.get('/viewlab', (req, res) => {
    if(req.session.adminlogin){
        console.log("admin_login@viewlab")
        pool.getConnection((err, result) => {
            if (err) console.log(err.message)
            else {
                console.log('student connected')
                console.log(result)
                var sql = `select * from lab;`
                result.query(sql, (err, rows, fiels) => {
                    if (err) console.log(err)
                    else {
                        console.log(rows)
                        result.release()
                        res.render('view_lab.ejs', { rows })
    
                    }
                })
            }
        })
        }
        else{
            console.log("pls login as admin");
            res.render('admin_login.ejs');
        }
    
    
})
app.get('/reglab', (req, res) => {
    if(req.session.adminlogin){
        console.log("admin_login@reglab")
        pool.getConnection((err, result) => {
            if (err) console.log(err.message)
            else {
                console.log('student connected')
                var sql = `select * from lab_log NATURAL JOIN user ;`
                result.query(sql, (err, rows, fiels) => {
                    if (err) console.log(err)
                    else {
                        console.log(rows)
                        result.release()
                        res.render('reg_lab.ejs', { rows })
    
                    }
                })
            }
        })
        }
        else{
            console.log("pls login as admin");
            res.render('admin_login.ejs');
        }
    
})
app.get('/myreg', (req, res) => {
    if(req.session.userlogin){
        console.log("user_login@myreg")
        pool.getConnection((err, result) => {
            if (err) console.log(err.message)
            else {
                console.log('student connected')
                var sql = `select * from lab_log NATURAL JOIN user WHERE u_id='${req.session.username}';`
                result.query(sql, (err, rows, fiels) => {
                    if (err) console.log(err)
                    else {
                        console.log(rows)
                        result.release()
                        res.render('user_reg.ejs', { rows })
    
                    }
                })
            }
        }) 
        }
        else{
            console.log("pls login as user");
            res.render('user_login.ejs');
        }
    
})
//day entery
app.get('/entery', (req, res) => {
    if(req.session.adminlogin){
        console.log("admin_login@dayentery")
        res.render('admin_dayentery.ejs');
        }
        else{
            console.log("pls login as admin");
            res.render('admin_login.ejs');
        }
    
})
//update lab
app.post('/update/lab', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {newlab_id,newlab_type,newlab_capacty,newlab_incharge_name,newlab_discripition}=req.body
    console.log('data',newlab_id,newlab_type,newlab_capacty,newlab_incharge_name,newlab_discripition); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `UPDATE lab SET l_type='${newlab_type}',l_capacty=${newlab_capacty},l_lab_inchargename='${newlab_incharge_name}',l_description='${newlab_discripition}' WHERE l_lab_id='${newlab_id}'`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else{
                    console.log(fields); 
                }
            })
        } 
    })

})
app.post('/new/lab', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {newlab_id,newlab_type,newlab_capacty,newlab_incharge_name,newlab_discripition}=req.body
    console.log('data',newlab_id,newlab_type,newlab_capacty,newlab_incharge_name,newlab_discripition); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `INSERT INTO lab (l_lab_id,l_type,l_capacty,l_lab_inchargename,l_description)VALUES ('${newlab_id}','${newlab_type}',${newlab_capacty},'${newlab_incharge_name}','${newlab_discripition}')`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else{
                    console.log(fields);
                    res.redirect('/admin/space')

                }
            })
        }
    })

})
//............................................................................................
//user space
app.get('/user/space',(req,res)=>{
    if(req.session.userlogin){
        
        console.log(req.session.username)
        console.log("user_login")
        res.render('user_space.ejs')
    }  
    else{
        console.log("pls login as user");
        res.render('user_login.ejs');
    }
})

//new reg
app.get('/user/reg',(req,res)=>{
    if(req.session.userlogin){
        console.log("user_login@reg")
        pool.getConnection((err, result) => {
            if (err) console.log(err.message)
            else {
                var sql = `select * from lab;`
                result.query(sql, (err, labdata, fiels) => {
                    if (err) console.log(err)
                    else { 
                        res.render('usernewlabreg.ejs', {labdata})
     
                    }
                })
            }
        })
    }  
    else{
        console.log("pls login as user");
        res.render('user_login.ejs');
    }
    
    //res.render('')
})
//avalable lab

app.get('/avalablelab', (req, res) => {
    if(req.session.userlogin){
        console.log("user_login@reglab")
        pool.getConnection((err, result) => {
            if (err) console.log(err.message)
            else {
                console.log('student connected')
                var sql = `select * from lab;`
                result.query(sql, (err, rows, fiels) => {
                    if (err) console.log(err)
                    else {
                        console.log(rows)
                        result.release()
                        res.render('user_avalavlelab.ejs', { rows })
     
                    }
                })
            }
        })
    }  
    else{
        console.log("pls login as user");
        res.render('user_login.ejs');
    }
   
}) 
//user reg
app.get('/ureglab', (req, res) => {
    if(req.session.userlogin){
        console.log("user_login@reglab")
        pool.getConnection((err, result) => {
            if (err) console.log(err.message)
            else {
                console.log('student connected')
                var sql = `select * from lab_log NATURAL JOIN user;`
                result.query(sql, (err, rows, fiels) => {
                    if (err) console.log(err)
                    else {
                        console.log(rows)
                        result.release()
                        res.render('user_reg.ejs', { rows })
     
                    }
                })
            }
        })
    }  
    else{
        console.log("pls login as user");
        res.render('user_login.ejs');
    }
   
}) 

//new regstation
app.post('/new/reg', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {u_regesterid,u_id,lab_id,u_type,fromtime,totime,u_count}=req.body
    console.log('data'); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `INSERT INTO lab_log (reg_id,u_id,u_type,lab_from_time,lab_to_time,lab_id,no_user )VALUES ('${u_regesterid}','${u_id}','${u_type}','${fromtime}','${totime}','${lab_id}',${u_count})`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else{
                    console.log(fields);
                    res.redirect('/user/space')

                }
            })
        }
    })

})


//select a log of lab

///-------------------------------------------------

app.listen(port, function () {
    console.log(`Started at ${port}`)
})

