var express = require('express'),
    app = express(),
    router = require('./routes');

app.use(router);
app.listen(3000,function(){
    console.log('Server is running at port 3000');
});