const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const babel = require('babel-core');
const generate = require('babel-generator').default;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Cache-Control');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.get('/file', function (req, res, next) {
    if (!req.query || !req.query.filename) {
        res.status(400);
        return res.json({error: {message: '`filename` is important parameters'}});
    }
    let dirname = path.join(__dirname, 'src/assets/components/');
    let extname = '.js';
    if (fs.existsSync(dirname + req.query.filename + extname)) {
        let content = fs.readFileSync(dirname + req.query.filename + extname, 'utf-8');
        const {ast} = babel.transform(content, {
          presets: ['react'],
          plugins: [
            ['transform-class-properties', {spec: true}]
          ]
        });
        let componentName = ast.program.body.find(node => node.type === 'ClassDeclaration').id.name;
        let properties = {};
        try {
          properties = ast.program.body.find(node => node.type === 'ExpressionStatement' && node.expression.arguments.find(arg => arg.value === 'defaultProps'));
          properties = properties.expression.arguments.find(node => node.type === 'ObjectExpression').properties.find(node => node.key.name === 'value').value;
          let props = {}
          properties.properties.map(one => {
            props[one.key.name] = one.value.value;
          });
          properties = props;
        } catch (e) {
            properties = {}
        }

        // way of editing component name
       /* ast.program.body.find(node => node.type === 'ClassDeclaration').id.name = 'TEEEST';
        const output = generate(ast, { /!* options *!/ }, content);
        console.log(output); */
        res.json({content: content, componentName: componentName, properties: properties});
    } else {
        res.json({error: {message: 'File not exist!'}});
    }
});

app.get('/files', function (req, res) {
    let dirname = path.join(__dirname, 'src/assets/components/');
    let files = [];
    let filenames = fs.readdirSync(dirname);
    if (filenames) {
        filenames.forEach(function (filename) {
            if (path.extname(filename) === ".js") {
                let file = {
                    filename: filename,
                    path: dirname + filename,
                    extname: ".js"
                };
                const stats = fs.statSync(file.path);
                file.lastUpdated = stats.mtime;
                file.size = stats.size;
                const {ast} = babel.transformFileSync(dirname + filename, {
                  presets: ['react'],
                  plugins: [
                    ['transform-class-properties', {spec: true}]
                  ]
                });
                file.componentName = ast.program.body.find(node => node.type === 'ClassDeclaration').id.name;
                files.push(file);
            }
        });
    }
    res.json({recordsData: files, recordsTotal: files.length})
});

app.post('/save_file', function (req, res) {
    if (!req.body || !req.body.filename) {
        res.status(400);
        return res.json({error: {message: '`filename` is important parameters'}});
    }
    let dirname = path.join(__dirname, 'src/assets/components/');
    let extname = '.js';
    if (fs.existsSync(dirname + req.body.filename + extname)) {
        fs.writeFileSync(dirname + req.body.filename + extname, req.body.content);
        res.json({success: true});
    } else {
        res.json({error: {message: 'File not exist!'}});
    }
});

app.listen(8081);

console.log('>> Listen server...');