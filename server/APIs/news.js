"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNews = void 0;
require("dotenv/config");
const KEY = process.env.NEWS_API_KEY || '80de228c33c04e90adbad3f3cbd609a0';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${KEY}`
    }
};
function fetchNews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const news = yield fetch(`https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${KEY}`, options)
            .then((article) => article.json())
            .catch(err => console.log(err));
        res.status(200).send(news.articles);
    });
}
exports.fetchNews = fetchNews;
