
module.exports = {
	/**
	 * 数据库测试
	 * @param {object}  target 测试的mysql连接信息
	 * @param {object}  source 正式的mysql连接信息
   * @param {Boolean}  flag	 true则返回source的数据,false则返回target的数据
	 */
	extend: function (target, source, flag) {
		for (var key in source) {
			if (source.hasOwnProperty(key))
				flag ? (target[key] = source[key]) : (target[key] === void 0 && (target[key] = source[key]));
		}
		return target;
	}
}