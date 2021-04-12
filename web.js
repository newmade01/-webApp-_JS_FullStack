const express = require('express')
var router = express.Router();
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); //요청은 모두 middleware를 통해서 전달  post전송
const cors = require('cors')
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
var path = require('path');
var params = require('params');
var loginID = '';
var engineerName = '';
const PORT = 1234;


//app.use
app.use(express.static(path.join(__dirname, 'public'))); //frontend부분 build값
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
    // app.get('/', (req, res) => {
    //     res.render('index')
    // })
app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`)
})
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


// //multer
// var storage = multer.memoryStorage();
// var upload = multer({
//     storage: storage,
// });

//ftp서버 연결 시작/////////////////////////////////////////////////////
var ftpClient = require('ftp-client'),
      config = {    
        host: "",
           
        port: "",
        user: "",
            
        password: 123456 
    },
      options = {    
        logging:   "",
    },
      client = new ftpClient(config, options);



//ftp서버 연결 끝////////////////////////////////////////////





const sql = require('mssql');
var config = {
    user: "",
    password: "",
    server: "",
    database: "",
    port: "",
    options: {
        encrypt: false, // Use true this if you're on Windows Azure
        enableArithAbort: true
    },

};










app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/public', 'index.html')); //Vue에서 만든 front에 접근하기 위해선 접근할 url을 지정
});



//cors 오류 설정값
app.all('*', function(req, res, next) {
    res.header("Accept-Encoding: gzip, deflate, br");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', "*");
    next();
});

app.use(
    cors({
        method: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
);




//DB쿼리///////////////////////////////////////////////

app.get('/ind', function(req, res, next) {
    res.send("ind파일")
});


//DB 쿼리문
sql.connect(config).then(pool => {

    //test문장
    app.get('/test', function(req, res, next) {


        var strQ = 'SELECT * FROM Table'
        return pool.request()
            .query(strQ)
            .then(response => {
                console.log(response)
                res.json(response.recordset)
            })
            .catch(err => {
                res.status(500)
                res.send(err.message)

            })
    });



    ///////////////////////////로그인 시작 ///////////////////////

    //로그인post
    app.post('/ind/signin/post', function(req, res, next) {

        var data = {
            // request 요청값
            ENGINEER_ID: req.body.ENGINEER_ID,
            ENGINEER_PW: req.body.ENGINEER_PW
        }



        var ENGINEER_ID = data.ENGINEER_ID ////agencyID로 저장
        loginID = ENGINEER_ID

        var ENGINEER_PW = data.ENGINEER_PW




        var strQ = 'select * from Table where PwdCompare(\'' + PW + '\', PW)=1 and  ID=\'' + ID + '\''

        return pool.request()
            .query(strQ) //해당 비밀번호, 아이디가 있을때-> 로그인
            .then(response => {
                console.log(response)
                if (response.recordset.length == 1) {
                    //id와 pw가 같을때
                    res.json(response)
                    res.status(200);


                } else {
                    res.end();

                }

                res.end();
            });
    });

    ///////////////////////////로그인 끝 ///////////////////////





    //공지사항 검색
    app.post('/ind/notice', function(req, res) {
        var searchTerm = req.body.searchTerm
        var strQ = 'select * from Table where SUBJECT LIKE \'%' + searchTerm + '%\''
        return pool.request()
            .query(strQ) //해당 비밀번호, 아이디가 있을때-> 로그인
            .then(response => {
                res.json(response.recordset) //무조건 성공
            })
            .catch(err => {
                res.send(err.message)
                res.end();
            })
    });





    //이미지 업로드

    var Dire = __dirname //현재 위치

    const shell = require('shelljs') //쉘스크립트^^
    const multer = require('multer')
    var Jimp = require("jimp")
    var fs = require('fs');
    var i = 0
    var j = 0
    var name = ''

    // multer setting
    const upload = multer({
        storage: multer.diskStorage({
            // set a localstorage destination
            destination: (req, file, cb) => {
                cb(null, './uploads');
            },
            // convert a file name
            filename: (req, file, cb) => {
                cb(null, file.originalname);
                name = file.originalname
            },
        }),
    });
    console.log(name)

    app.post('/ind/image', upload.single('bin'), (req, res, next) => {
        // //원본 이미지 보내기
        // client.upload(["./uploads/" + name], '/www/test', {
        //     baseDir: 'uploads',
        //     overwrite: 'older'
        // }, function(result) {
        //     console.log(result);
        // });

        console.log('이미지파일 이름' + name)
            //Qfactor 이미지 용량 줄임
        var file = './uploads/' + name
        Jimp.read(file, function(err, lenna) { //upload파일에서 읽어옴
            if (err) throw err;
            lenna
            // .resize(200, 200) // resize 
                .quality(60) // set JPEG quality 
                .greyscale() // set greyscale 
                .write('./qFactor/' + name); // save 

        })


        client.connect(function() {



            console.log('실행')
                //큐팩터 이미지를 보냄
            client.upload(["./qFactor/" + name], '/www/test', {
                baseDir: 'uploads',
                overwrite: 'older'
            }, function(result) {
                console.log(result);
            });
        });

        res.status(204).send()
    })






    //  alert 쿼리문 서비스리포트 보내기
    app.post('/ind/serviceReportSend', function(req, res) {

        var data = {
            // request 요청값
            searchDate: req.body.date, //날짜입력
            searchText: req.body.searchText, //텍스트
            searchName: engineerName, //담당자이름
            searchRegdate: req.body.searchRegdate, //만료일

        }

        var index = 333 //키값들 null 불가로 임의의 값
        var strQ = 'INSERT INTO Table(1, 2, 3, 4, 5,6,7, 8)  VALUES(\'' + data.searchDate + '\', \'' + data.searchText + '\', \'' + data.searchName + '\', \'' + index + '\', \'' + index + '\', \'' + data.searchRegdate + '\', \'' + index + '\', \'' + index + '\')'
            .query(strQ) //해당 비밀번호, 아이디가 있을때-> 로그인
            .then(response => {
                res.json(response.data) //무조건 성공

            })
            .catch(err => {
                res.end();
            })
    });




    // 서명 보내기
    app.post('/ind/canvas', function(req, res) {
        var data = req.body.data
        var isEmpty = req.body.isEmpty

        var signatureKey = 111
        var strQ = 'INSERT INTO Table(1, 2, 3)  VALUES(\'' + isEmpty + '\', \'' + data + '\', \'' + signatureKey + '\')'
        return pool.request()
            .query(strQ)
            .then(response => {
                res.json(response)

            })
            .catch(err => {
                res.end();
            })
    });



})



app.use(cors())