'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  parserUtil = require('../customLib/parser.js'),
  Markdown = require('../model/markdown').Markdown;

exports.getAll = {
  handler: function(request, reply) {
    Markdown.getAll(function(err, markdowns) {
      if (!err) {
        return reply(markdowns);
      } else {
        return reply(Boom.badImplementation(err)); // 500 error
      }
    });
  }
};

exports.get = {
  handler: function(request, reply) {
    Markdown.get(request.params.markdownId, function(err, markdown) {
      if (!err) {
        if (markdown)
          return reply(markdown);
        else
          return reply(Boom.badRequest("No markdown found"));
      } else {
        return reply(Boom.badImplementation(err)); // 500 error
      }
    });
  }
};
exports.createMarkdown = {
  validate: {
    payload: {
      markdown: Joi.string().required()
    }
  },
  handler: function(request, reply) {
    var html = [];
    var str = request.payload.markdown;
    html = parserUtil.markdownParser(str);
    if (!html) {
      return (Boom.badRequest('Nothing to process'));
    }
    Markdown.createMarkdown({
        markdown: request.payload.markdown,
        html: html.join("\n")
      },
      function(err, markdown) {
        if (err) {
          return reply(Boom.badRequest(err));
        } else {
          return reply(markdown);
        }
      });
  }
};