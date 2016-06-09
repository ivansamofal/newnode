var request = require('request');
var cheerio = require('cheerio');

var express = require('express');
var template = require('consolidate').handlebars;
var app = express();

app.engine('hbs', template);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');




request('http://www.rbc.ru', function (error, response, html){
	if (error) {
	return console.error('error is: ', error);
}

	if (response.statusCode !== 200) {
	return console.log('incorrect statusCode: ', response.statusCode);
}

var $ = cheerio.load(html);

var news = [];
//picture
	var mainImage =  $('.main__big__image')[0].attribs.src;
	console.log($('.main__big__image')[0].attribs.src);
//src for 14news
	var allSrc = [];
	//allSrc =+  $('.main-feed__item  a')[0].attribs.href;
	  $('.main-feed__item  a').each(function(i, element){
console.log($(element)[0].attribs.href);
allSrc.push($(element)[0].attribs.href);
console.log(allSrc[0] + 'rrrrrrrrrrrrrrrr');
});

console.log(allSrc + 'kkkkkkkk');
	//console.log($('.main-feed__item  a')[0].attribs.href);
//desctiption
	var mainDesc =  $('.main__big__description > span')[0].children[0].data;
	console.log($('.main__big__description > span')[0].children[0].data);
	
//big title main news
	var mainNews =  $('.main__big__title__text')[0].children[0].data;
	console.log($('.main__big__title__text')[0].children[0].data);

//14 news in p tags
	 $('.main-feed__item__title').each(function(i, element){
	console.log($(element).text().trim());
	
	news.push ($(element).text().trim());
	


app.get('/', function (req, res){
res.render('index', {
news: news,
title: 'news from rbc',
title2: 'newew',
mainNews: mainNews,
mainImage: mainImage,
mainDesc: mainDesc,
allSrc: allSrc,
});
});


});
	
	});


app.listen(8000, function(){
console.log('the server is running at the port: ', 8000);
});
