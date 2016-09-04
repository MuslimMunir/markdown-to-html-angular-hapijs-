// Load modules

var Markdown = require('./controller/markdown'),
  Static = require('./static');

// API Server Endpoints
exports.endpoints = [

  {
    method: 'GET',
    path: '/{somethingss*}',
    config: Static.get
  }, {
    method: 'GET',
    path: '/markdown/get/{markdownId}',
    config: Markdown.get
  }, {
    method: 'GET',
    path: '/markdown/get',
    config: Markdown.getAll
  }, {
    method: 'POST',
    path: '/markdown/save',
    config: Markdown.createMarkdown
  }
];