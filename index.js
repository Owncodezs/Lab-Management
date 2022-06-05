const express = require('express')
const path = require("path")
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

const port = 3000


const app = express()
app.use(express.static(path.join(__dirname, "/public")))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
//----------------------------------------------------------------------------------------------------------
//home page
app.get('/',(req,res)=>{
    console.log("home")
    res.render('home.ejs')
    
})
//admin login
app.get('/admin/login',(req,res)=>{
    console.log("admin_login")
   res.render('admin_login.ejs')
  
})
//user locin
app.get('/user/login',(req,res)=>{
    console.log("user_login")
   res.render('user_login.ejs')
  
})

//admin space
app.get('/admin/space',(req,res)=>{
    console.log("admin_login")
   res.render('admin_space.ejs')
    
}) 

app.get('/updatelab',(req,res)=>{
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

    
}) 
 
app.get('/newlab',(req,res)=>{
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
}) 
//user space
app.get('/user/space',(req,res)=>{
    res.render('user_space.ejs')
})

//new reg
app.get('/user/reg',(req,res)=>{
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
    //res.render('')
}) 
 
//.......................................... 
//login admin validation
app.post('/admin/login', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {fmuser,fmpass,fmtype}=req.body
    console.log('data',fmuser,fmpass,fmtype); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `select * from dbmanagement_login where user_id = '${fmuser}'  AND pass= '${fmpass}' AND type= '${fmtype}'`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else if( rows[0].pass=fmpass ) {
                    //console.log(rows[0].type)
                    res.redirect('/admin/login')
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
//----------------------------------------------------
//Select a labe
app.get('/viewlab', (req, res) => {
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
})

//select a log of lab
app.get('/reglab', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student connected')
            var sql = `select * from lab_log,user;`
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
})
app.get('/ureglab', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student connected')
            var sql = `select * from lab_log,user;`
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
})
///-------------------------------------------------

app.listen(port, function () {
    console.log("Started")
})

