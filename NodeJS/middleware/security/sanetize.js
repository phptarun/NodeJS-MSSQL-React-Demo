
// const { TextEncoder, TextDecoder } = require('util');
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
//var clean = DOMPurify.sanitize(dirty);
//const allowedChars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789@!#$%^&*(){}[]/\|.~`=_-+?';

const sanitize = (req, res, next) => {
    console.log('------ sanitize ----------------');
    if (req.query) {
        for (let key in req.query) {
            req.query[key] = DOMPurify.sanitize(req.query[key]);
        }
    }

    if (req.body) {
        let body = JSON.stringify(req.body);
        body = DOMPurify.sanitize(body);
        req.body = JSON.parse(body);
    }
    // console.log('------ req.query ----------------');
    // console.log(req.query)
    // console.log('------ req.body ----------------');
    // console.log(req.body)
    next();
}

module.exports = sanitize;