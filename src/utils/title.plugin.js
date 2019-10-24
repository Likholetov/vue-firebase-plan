export default {
	install(Vue, options) {
		Vue.prototype.$title = function(titleKey) {
			const appName = 'VUE-PLAN';
			return `${titleKey} | ${appName}`;
		};
	}
};
