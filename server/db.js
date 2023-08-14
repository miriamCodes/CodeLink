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
exports.sequelize = exports.Sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
require("dotenv/config");
const config = {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
};
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, config);
exports.sequelize = sequelize;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            yield sequelize.sync();
            console.log('Connection has been established successfully.');
        }
        catch (err) {
            console.error('Unable to connect to the database:', err);
        }
    });
})();
