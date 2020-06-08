const express = require('express');
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//路由
const Index = require('./routers/index')
app.use('/', Index);
//Api
const user = require('./api/user')
app.use('/api/v1', user)

app.listen(port, () => console.log(`app listening on port: %s `, port))