/* global beforeEach */

var request = require('supertest');
var casual = require('casual');
var timeout = 3000;
var url = 'localhost:8080/markdown/'

describe('Markdown', function() {
    var markdown = '#' + casual.title + '\n' +
        '##' + casual.title + '\n' +
        '###' + casual.title + '\n' +
        '*' + casual.title + '*\n' +
        '**' + casual.title + '**\n' +
        casual.sentences(n = 3);
    it("Create Markdown", function(done) {
        this.timeout(timeout);
        request(url)
            .post('save')
            .send({
                markdown: markdown
            })
            .expect(200)
            .end(done);
    });

    it('Get Markdowns', function(done) {
        this.timeout(timeout);
        request(url)
            .get('get')
            .expect(200)
            .end(done);
    });

    it("Get Markdown", function(done) {
        this.timeout(timeout);
        request(url)
            .post('save')
            .send({
                markdown: markdown
            })
            .expect(200)
            .end(function(err, result) {
                if (err) done(err);
                else {
                    return request(url)
                        .get('get/' + result.body._id)
                        .expect(200)
                        .end(done);
                }
            });


    });

});