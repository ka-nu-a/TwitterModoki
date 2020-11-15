/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/postgres.js":
/*!********************************!*\
  !*** ./src/server/postgres.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Pool = __webpack_require__(/*! pg */ \"pg\").Pool;\n\nvar connectionString = 'postgresql://admin:admin@localhost:5432/twitter_modoki';\n/*const connectionString = {\n\tdatabase: \"dqx_craftsman\",\n\tuser: \"admin\",\n\tpassword: \"admin\",\n\thost: \"localhost\",\n\tport: 5432,\n}*/\n\nvar pool = new Pool({\n  connectionString: connectionString\n});\n/**\n * Postgresクラス\n */\n\nvar Postgres = /*#__PURE__*/function () {\n  function Postgres() {\n    _classCallCheck(this, Postgres);\n  }\n\n  _createClass(Postgres, [{\n    key: \"init\",\n\n    /**\n     * Poolからclientを取得\n     * @return {Promise<void>}\n     */\n    value: function () {\n      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return pool.connect();\n\n              case 2:\n                this.client = _context.sent;\n\n              case 3:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      function init() {\n        return _init.apply(this, arguments);\n      }\n\n      return init;\n    }()\n    /**\n     * SQLを実行\n     * @param query\n     * @param params\n     * @return {Promise<*>}\n     */\n\n  }, {\n    key: \"execute\",\n    value: function () {\n      var _execute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {\n        var params,\n            _args2 = arguments;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];\n                _context2.next = 3;\n                return this.client.query(query, params);\n\n              case 3:\n                return _context2.abrupt(\"return\", _context2.sent.rows);\n\n              case 4:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function execute(_x) {\n        return _execute.apply(this, arguments);\n      }\n\n      return execute;\n    }()\n    /**\n     * 取得したクライアントを解放してPoolに戻す\n     * @return {Promise<void>}\n     */\n\n  }, {\n    key: \"release\",\n    value: function () {\n      var _release = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n        return regeneratorRuntime.wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                _context3.next = 2;\n                return this.client.release(true);\n\n              case 2:\n              case \"end\":\n                return _context3.stop();\n            }\n          }\n        }, _callee3, this);\n      }));\n\n      function release() {\n        return _release.apply(this, arguments);\n      }\n\n      return release;\n    }()\n    /**\n     * Transaction Begin\n     * @return {Promise<void>}\n     */\n\n  }, {\n    key: \"begin\",\n    value: function () {\n      var _begin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {\n        return regeneratorRuntime.wrap(function _callee4$(_context4) {\n          while (1) {\n            switch (_context4.prev = _context4.next) {\n              case 0:\n                _context4.next = 2;\n                return this.client.query('BEGIN');\n\n              case 2:\n              case \"end\":\n                return _context4.stop();\n            }\n          }\n        }, _callee4, this);\n      }));\n\n      function begin() {\n        return _begin.apply(this, arguments);\n      }\n\n      return begin;\n    }()\n    /**\n     * Transaction Commit\n     * @return {Promise<void>}\n     */\n\n  }, {\n    key: \"commit\",\n    value: function () {\n      var _commit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {\n        return regeneratorRuntime.wrap(function _callee5$(_context5) {\n          while (1) {\n            switch (_context5.prev = _context5.next) {\n              case 0:\n                _context5.next = 2;\n                return this.client.query('COMMIT');\n\n              case 2:\n              case \"end\":\n                return _context5.stop();\n            }\n          }\n        }, _callee5, this);\n      }));\n\n      function commit() {\n        return _commit.apply(this, arguments);\n      }\n\n      return commit;\n    }()\n    /**\n     * Transaction Rollback\n     * @return {Promise<void>}\n     */\n\n  }, {\n    key: \"rollback\",\n    value: function () {\n      var _rollback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {\n        return regeneratorRuntime.wrap(function _callee6$(_context6) {\n          while (1) {\n            switch (_context6.prev = _context6.next) {\n              case 0:\n                _context6.next = 2;\n                return this.client.query('ROLLBACK');\n\n              case 2:\n              case \"end\":\n                return _context6.stop();\n            }\n          }\n        }, _callee6, this);\n      }));\n\n      function rollback() {\n        return _rollback.apply(this, arguments);\n      }\n\n      return rollback;\n    }()\n  }]);\n\n  return Postgres;\n}();\n/**\n * Postgresのインスタンスを返却\n * @return {Promise<Postgres>}\n */\n\n\nfunction getClient() {\n  return _getClient.apply(this, arguments);\n}\n\nfunction _getClient() {\n  _getClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {\n    var postgres;\n    return regeneratorRuntime.wrap(function _callee7$(_context7) {\n      while (1) {\n        switch (_context7.prev = _context7.next) {\n          case 0:\n            postgres = new Postgres();\n            _context7.next = 3;\n            return postgres.init();\n\n          case 3:\n            return _context7.abrupt(\"return\", postgres);\n\n          case 4:\n          case \"end\":\n            return _context7.stop();\n        }\n      }\n    }, _callee7);\n  }));\n  return _getClient.apply(this, arguments);\n}\n\n;\nmodule.exports.getPostgresClient = getClient;\n\n//# sourceURL=webpack:///./src/server/postgres.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar port = process.env.PORT || 8080;\nvar app = express();\nvar PATH_CLIENT = path.resolve(__dirname, '..', 'client');\n\nvar getPostgresClient = __webpack_require__(/*! ./postgres */ \"./src/server/postgres.js\").getPostgresClient; //const getPostgresClient = require('pg');\n\n\napp.use(express[\"static\"]('./'));\napp.use(express[\"static\"](path.join('./', 'dist')));\napp.use(express[\"static\"](path.join('./', 'dist', 'client'))); //console.log(`server is running at ${port}`);\n//console.log(`dirname is ${__dirname}`);\n\napp.get('/api/read/', function (req, res) {\n  console.log('DB: Read');\n\n  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var db, SQL, result;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return getPostgresClient();\n\n          case 3:\n            db = _context.sent;\n            SQL = 'SELECT * FROM hoge';\n            _context.next = 7;\n            return db.execute(SQL);\n\n          case 7:\n            result = _context.sent;\n            //console.log(result);\n            res.status(200).send(result);\n            _context.next = 16;\n            break;\n\n          case 11:\n            _context.prev = 11;\n            _context.t0 = _context[\"catch\"](0);\n            console.log('#ERROR#: unknown');\n            res.status(500).send(\"DB Error.\");\n            throw _context.t0;\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 11]]);\n  }))();\n});\napp.get('/api/write/:name', function (req, res) {\n  //console.log('DB: write: ' + req.params.name);\n  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n    var db, SQL, result;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.prev = 0;\n            _context2.next = 3;\n            return getPostgresClient();\n\n          case 3:\n            db = _context2.sent;\n            SQL = \"INSERT INTO hoge(foo) VALUES ($1)\";\n            _context2.next = 7;\n            return db.execute(SQL, [req.params.name]);\n\n          case 7:\n            result = _context2.sent;\n            //console.log(result);\n            res.status(200).send(\"Succeed!\");\n            _context2.next = 16;\n            break;\n\n          case 11:\n            _context2.prev = 11;\n            _context2.t0 = _context2[\"catch\"](0);\n            console.log('#ERROR#: unknown');\n            res.status(500).send(\"DB Error.\");\n            throw _context2.t0;\n\n          case 16:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[0, 11]]);\n  }))();\n});\napp.get('/api/delete/', function (req, res) {\n  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n    var db, SQL, result;\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _context3.prev = 0;\n            _context3.next = 3;\n            return getPostgresClient();\n\n          case 3:\n            db = _context3.sent;\n            SQL = \"DELETE from hoge\";\n            _context3.next = 7;\n            return db.execute(SQL);\n\n          case 7:\n            result = _context3.sent;\n            res.status(200).send(\"Succeed!\");\n            _context3.next = 16;\n            break;\n\n          case 11:\n            _context3.prev = 11;\n            _context3.t0 = _context3[\"catch\"](0);\n            console.log('#ERROR#: unknown');\n            res.status(500).send(\"DB Error.\");\n            throw _context3.t0;\n\n          case 16:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, null, [[0, 11]]);\n  }))();\n});\napp.get('/api/delete/:name', function (req, res) {\n  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {\n    var db, SQL, result;\n    return regeneratorRuntime.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            _context4.prev = 0;\n            _context4.next = 3;\n            return getPostgresClient();\n\n          case 3:\n            db = _context4.sent;\n            SQL = \"DELETE from hoge WHERE foo = $1\";\n            _context4.next = 7;\n            return db.execute(SQL, [req.params.name]);\n\n          case 7:\n            result = _context4.sent;\n            res.status(200).send(\"Succeed!\");\n            _context4.next = 16;\n            break;\n\n          case 11:\n            _context4.prev = 11;\n            _context4.t0 = _context4[\"catch\"](0);\n            console.log('#ERROR#: unknown');\n            res.status(500).send(\"DB Error.\");\n            throw _context4.t0;\n\n          case 16:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4, null, [[0, 11]]);\n  }))();\n});\napp.get('/*', function (req, res) {\n  console.log('**');\n  res.sendFile(path.resolve(PATH_CLIENT, 'index.html'));\n});\napp.listen(port);\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi @babel/polyfill ./src/server/server.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @babel/polyfill */\"@babel/polyfill\");\nmodule.exports = __webpack_require__(/*! ./src/server/server.js */\"./src/server/server.js\");\n\n\n//# sourceURL=webpack:///multi_@babel/polyfill_./src/server/server.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pg\");\n\n//# sourceURL=webpack:///external_%22pg%22?");

/***/ })

/******/ });