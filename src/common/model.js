/**
 * @module model
 * @desc model模块发请求.
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)  
 */
define(function(require, exports, module) {
	
	var cAjax = require("ajax");

	var AbstractModel = Class.extend({
		init: function(options) {
			/**
			 * {String} 必填，数据读取url
			 */
			this.url = null;
			/**
			 * {Object|Store} 必选，用于存贮请求参数
			 */
			this.param = {};
			/**
			 * {Function} 可选，数据返回时的自定义格式化函数
			 */
			this.dataformat = null;

			/**
			 * {Function} 可选，存放用于验证的函数集合
			 */
			this.validates = [];

			// 加入debug模式
			this.debug = false;

			/**
			 * {String} 可选，提交数据格式
			 */
			this.contentType = AbstractModel.CONTENT_TYPE_JSON;
			/**
			 * {String} 可选， 提交数据的方法
			 */
			this.method = 'POST';
			/**
			 * {Boolean} 可覆盖，提交参数是否加入head
			 */
			this.usehead = true;

			//@param {Boolean} 可选，是否是用户相关数据
			this.isUserData = false;
			// @description 替代headstore信息的headinfo
			this.headinfo = null;

			//当前的ajax对象
			this.ajax;
			//是否主动取消当前ajax
			this.isAbort = false;

			//参数设置函数
			this.onBeforeCompleteCallback = null;

			/**
			 * {Store} 可选，
			 */
			this.result = {};
			// @param {Boolean} 可选，只通过ajax获取数据，不做localstorage数据缓存
			this.ajaxOnly = false;

			this.initialize(options);
		},
		initialize: function(options) {
			for (var key in options) {
				this[key] = options[key];
			}
			this.assert();
			//不这样this.protocol写不进去，已经存在了就不管了
			//if (!this.baseurl) this.baseurl = AbstractModel.baseurl.call(this, this.protocol);
		},
		assert: function() {
			if (this.url === null) {
				throw 'not override url property';
			}
		},

		pushValidates: function(handler) {
			if (typeof handler === 'function') {
				this.validates.push($.proxy(handler, this));
			}
		},

		/**
		 * 重写父类
		 *  设置提交参数
		 *  @param {String} param 提交参数
		 *  @return void
		 */
		setParam: function(key, val) {
			if (typeof key === 'object' && !val) {
				this.param = _.extend(this.param, key);
			} else {
				this.param[key] = val;
			}
		},

		/**
		 * 获得提交
		 * @param void
		 * @return {Object} 返回一个Object
		 */
		getParam: function() {
			return this.param;
		},

		getTag: function() {
			var params = _.clone(this.getParam() || {});
			return JSON.stringify(params);
		},

		//构建url请求方式，子类可复写，我们的model如果localstorage设置了值便直接读取，但是得是非正式环境
		buildurl: function() {

			var tempUrl = this.url;

			return tempUrl;
		},
		/**
		 * 取model数据
		 * @param {Function} onComplete 取完的回调函
		 * 传入的第一个参数为model的数第二个数据为元数据，元数据为ajax下发时的ServerCode,Message等数
		 * @param {Function} onError 发生错误时的回调
		 * @param {Boolean} ajaxOnly 可选，默认为false当为true时只使用ajax调取数据
		 * @param {Boolean} scope 可选，设定回调函数this指向的对象
		 * @param {Function} onAbort 可选，但取消时会调用的函数
		 */
		execute: function(onComplete, onError, scope, onAbort, params) {

			// @description 定义是否需要退出ajax请求
			this.isAbort = false;

			// @description 请求数据的地址
			var url = this.buildurl();

			var self = this;

			var __onComplete = $.proxy(function(data) {

				if (this.validates && this.validates.length > 0) {

					// @description 开发者可以传入一组验证方法进行验证
					for (var i = 0, len = this.validates.length; i < len; i++) {
						if (!this.validates[i](data)) {

							// @description 如果一个验证不通过就返回
							if (typeof onError === 'function') {
								return onError.call(scope || this, data);
							} else {
								return false;
							}
						}
					}
				}

				// @description 对获取的数据做字段映射
				var datamodel = typeof this.dataformat === 'function' ? this.dataformat(data) : data;

				if (typeof this.onBeforeCompleteCallback === 'function') {
					this.onBeforeCompleteCallback(datamodel);
				}

				if (typeof onComplete === 'function') {
					onComplete.call(scope || this, datamodel, data);
				}

			}, this);

			var __onError = $.proxy(function(e) {
				if (self.isAbort) {
					self.isAbort = false;

					if (typeof onAbort === 'function') {
						return onAbort.call(scope || this, e);
					} else {
						return false;
					}
				}

				if (typeof onError === 'function') {
					onError.call(scope || this, e);
				}

			}, this);

			// @description 从this.param中获得数据，做深copy
			var params = params || _.clone(this.getParam() || {});

			if (this.contentType === AbstractModel.CONTENT_TYPE_JSON) {

				// @description 跨域请求
				return this.ajax = cAjax.cros(url, this.method, params, __onComplete, __onError);
			} else if (this.contentType === AbstractModel.CONTENT_TYPE_JSONP) {

				// @description jsonp的跨域请求
				return this.ajax = cAjax.jsonp(url, params, __onComplete, __onError);
			} else {

				// @description 默认post请求
				return this.ajax = cAjax.post(url, params, __onComplete, __onError);
			}
		},
		/**
		 *  取model数据
		 *  @param {Function} onComplete 取完的回调函
		 *  传入的第一个参数为model的数第二个数据为元数据，元数据为ajax下发时的ServerCode,Message等数
		 *  @param {Function} onError 发生错误时的回调
		 *  @param {Boolean} ajaxOnly 可选，默认为false当为true时只使用ajax调取数据
		 *   @param {Boolean} scope 可选，设定回调函数this指向的对象
		 *   @param {Function} onAbort 可选，但取消时会调用的函数
		 */
		excute: function(onComplete, onError, ajaxOnly, scope, onAbort) {

			var params = _.clone(this.getParam() || {});

			//验证错误码
			this.pushValidates(function(data) {
				if (+data.code == 0) {
					return true;
				} else {
					return false;
				}
			});

			// @description 业务相关，获得localstorage的tag
			var tag = this.getTag();
			// @description 业务相关，从localstorage中获取上次请求的数据缓存
			var cache = this.result && this.result.get && this.result.get(tag);

			if (!cache || this.ajaxOnly || ajaxOnly) {

				this.onBeforeCompleteCallback = function(datamodel) {
					//if (this.result instanceof AbstractStore) {
					//  this.result.set(datamodel, tag);
					//}
				}
				this.execute(onComplete, onError, scope, onAbort, params)

			} else {
				if (typeof onComplete === 'function') {
					onComplete.call(scope || this, cache);
				}
			}

		},
		abort: function() {
			this.isAbort = true;
			this.ajax && this.ajax.abort && this.ajax.abort();
		}
	});

	/** ajax提交数据的格式，目前后面可能会有两种提交格式：json数据提交,form表单方式 **/
	AbstractModel.CONTENT_TYPE_JSON = 'json';
	AbstractModel.CONTENT_TYPE_FORM = 'form';
	AbstractModel.CONTENT_TYPE_JSONP = 'jsonp';

	module.exports = AbstractModel;
});