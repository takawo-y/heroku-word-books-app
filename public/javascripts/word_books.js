/**
 * Created with JetBrains WebStorm.
 * User: 9004027600
 * Date: 14/06/16
 * Time: 18:22
 * To change this template use File | Settings | File Templates.
 */

//DB接続
var mongoose = require("mongoose");
var uriString = process.env.MONGOLAB_URI ||
		process.env.MONGOHQ_URL ||
		"mongodb://localhost/test";

var wbSchema = new mongoose.Schema({
	"work_book_name" : String,
	"regist_date" : String,
	"update_date" : String,
	"front_card" : String,
	"back_card" : String,
	"results" : [
		{
			"date" : String,
			"result" : Boolean
		}
	]
});
mongoose.model("word_book", wbSchema);
mongoose.connect(uriString);

// mongoDB接続時のエラーハンドリング
var db = mongoose.connection;db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to 'winedb' database");
	// 定義したときの登録名で呼び出し
	Wine = mongoose.model('Wine');
	populateDB();
});

exports.findAll = function(req, res){
	console.log("Getting Wordbooks List!!");

	wbModel.find({}).exec(function(err, docs) {
		if(!err) {
			console.log('Success: Getting Wordbooks List');
			console.log("num of item => " + docs.length);
			res.json(docs);
		} else {
			res.send({error: "An error has occurred"});
		}
	});

}



