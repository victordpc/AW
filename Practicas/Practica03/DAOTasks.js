"use strict";

const mysql = require("mysql");


class DAOTasks {
    constructor(pool) {
        if (pool == undefined) {
            throw "Pool not defined"
        }
        this._pool=pool; 
    }
}