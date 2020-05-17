"use strict";
var model = require("../models/index");
var config = require("../config");
var btoa = require("btoa");
var atob = require("atob");

exports.shorten = function (req, res) {
	try {
		let original_url = req.body.url_to_shorten;
		var hostname = req.protocol + "://" + req.headers.host + "/";
		// -------------
		model.Shorten.findOne({ where: { original_url: original_url } }).then((item) => {
			if (item) {
				//entry found in db
				res.send({
					shortened_url: hostname + btoa(item.id),
					id: item.id,
				});
			} else {
				//entry NOT found in db, saving new
				model.Shorten.create({
					original_url: original_url,
				})
					.then(function (result) {
						res.status(201).json({
							shortened_url: req.protocol + "://" + req.headers.host + "/" + btoa(result.id),
							id: result.id,
						});
					})
					.catch(function (error) {
						res.status(500).send(err);
					});
			}
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

exports.shorten_redirect = function (req, res) {
	try {
		let baseid = req.params.hash;
		var id = atob(baseid);
		// -------------
		model.Shorten.findById(id)
			.then((item) => {
				if (item) {
					res.redirect(item.original_url);
				} else {
					res.send({
						shortened_url: "not found",
						original_url: "not found",
					});
				}
			})
			.catch(function (err) {
				res.status(500).send(err);
			});
	} catch (err) {
		res.status(500).send(err);
	}
};

exports.shorten_getByHash = function (req, res) {
	try {
		let baseid = req.params.hash;
		var id = atob(baseid);
		var hostname = req.protocol + "://" + req.headers.host + "/";
		// -------------
		model.Shorten.findById(id)
			.then((item) => {
				if (item) {
					//entry found in db
					res.send({
						id: item.id,
						shortened_url: hostname + btoa(item.id),
						original_url: item.original_url,
					});
				} else {
					res.send({
						shortened_url: "not found",
						original_url: "not found",
					});
				}
			})
			.catch(function (err) {
				res.status(500).send(err);
			});
	} catch (err) {
		res.status(500).send(err);
	}
};
