var express = require('express'),
    mysql = require('mysql'),
    router = express.Router();


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'indonesia'
});

var sendRespon = function(res,err,data){
    if(err){
        throw err;
    }
    res.json({
        status: 'ok',
        data: data
    });
    connection.end();
};

router.get('/provinces',function(req,res){
    var search = req.query.search;
    if(search){
        search = '%' + search + '%';
        connection.query("SELECT * FROM provinces WHERE name LIKE ?",[search],function(err,rows,fields){
            sendRespon(res,err,rows);
        });
    } else {
        connection.query('SELECT * FROM provinces', function (err, rows, fields) {
            sendRespon(res, err, rows);
        });
    }
});

router.get('/provinces/:id',function(req,res){
    var id = req.params.id;
    var kabupaten = req.query.getKabupaten;
    if(kabupaten){
        connection.query('SELECT * from regencies WHERE province_id = ?',[id],function(err,rows,fields){
            sendRespon(res,err,rows);
        });
    } else {
        connection.query('SELECT * FROM provinces WHERE id = ?',[id],function(err,rows,fields){
            sendRespon(res,err,rows);
        });
    }

});

router.get('/regencies',function(req,res){
    var search = req.query.search;
    if (search){
        search = '%' + search + '%';
        connection.query("SELECT * FROM regencies WHERE name LIKE ?",[search],function(err,rows,fields){
            sendRespon(res,err,rows);
        });
    } else {
        connection.query('SELECT * FROM regencies', function(err,rows,fields){
            sendRespon(res,err,rows);
        })
    }

});

router.get('/regencies/:id',function(req,res){
    var district = req.query.getDistrict;
    var id = req.params.id;
    if(district){
        connection.query("SELECT * FROM  districts where regency_id = ?",[id],function(err,rows,fields){
            sendRespon(res,err,rows);
        });
    }
    connection.query('SELECT * FROM regencies WHERE id = ?',[id], function(err,rows,fields){
        sendRespon(res,err,rows);
    })
});

router.get('/districts',function(req,res){
    var search = req.query.search;

    if (search){
        search = '%' + search + '%';
        connection.query("SELECT * FROM districts WHERE name LIKE ?",[search],function(err,rows,fields){
            sendRespon(res,err,rows);
        });
    } else {
        connection.query('SELECT * FROM districts', function(err,rows,fields){
            sendRespon(res,err,rows);
        })
    }

});

router.get('/districts/:id',function(req,res){
    var district = req.query.getVillages;
    var id = req.params.id;
    if(district){
        connection.query("SELECT * FROM villages where district_id = ?",[id],function(err,rows,fields){
            sendRespon(res,err,rows);
        });
    }
    connection.query('SELECT * FROM districts WHERE id = ?',[id], function(err,rows,fields){
        sendRespon(res,err,rows);
    })
});


router.get('/villages',function(req,res){
    var search = req.query.search;

    if (search){
        search = '%' + search + '%';
        connection.query("SELECT * FROM villages WHERE name LIKE ?",[search],function(err,rows,fields){
            sendRespon(res,err,rows);
        });
    } else {
        connection.query('SELECT * FROM villages', function(err,rows,fields){
            sendRespon(res,err,rows);
        })
    }

});

router.get('/villages/:id',function(req,res){
    var id = req.params.id;
    connection.query('SELECT * FROM villages WHERE id = ?',[id], function(err,rows,fields){
        sendRespon(res,err,rows);
    })
});

module.exports = router;