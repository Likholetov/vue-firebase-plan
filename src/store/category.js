import firebase from 'firebase/app';

export default {
	actions: {
		async fetchCategories({ commit, dispatch }) {
			try {
				const uid = await dispatch('getUid');
				const categories =
					(
						await firebase
							.database()
							.ref(`/users/${uid}/categories`)
							.once('value')
					).val() || {};
				return Object.keys(categories).map(key => ({
					...categories[key],
					id: key
				}));
			} catch (e) {
				commit('setError', e);
				throw e;
			}
		},
		async fetchCategoryById({ commit, dispatch }, id) {
			try {
				const uid = await dispatch('getUid');
				const category =
					(
						await firebase
							.database()
							.ref(`/users/${uid}/categories`)
							.child(id)
							.once('value')
					).val() || {};
				return { ...category, id: id };
			} catch (e) {
				commit('setError', e);
				throw e;
			}
		},
		async updateCategory({ commit, dispatch }, { id, title, limit }) {
			try {
				const uid = await dispatch('getUid');
				const category = await firebase
					.database()
					.ref(`/users/${uid}/categories`)
					.child(id)
					.update({ title, limit });
			} catch (e) {
				commit('setError', e);
				throw e;
			}
		},
		async deleteCategory({ commit, dispatch }, { id }) {
			try {
				const uid = await dispatch('getUid');
				const category = await firebase
					.database()
					.ref(`/users/${uid}/categories`)
					.child(id)
					.remove();
				const records =
					(
						await firebase
							.database()
							.ref(`/users/${uid}/records`)
							.once('value')
					).val() || {};
				const keyRecords = Object.keys(records).map(key => ({
					...records[key],
					id: key
				}));
				keyRecords.map(async record => {
					if (record.categoryId == id) {
						await firebase
							.database()
							.ref(`/users/${uid}/records`)
							.child(record.id)
							.remove();
					}
				});
			} catch (e) {
				commit('setError', e);
				throw e;
			}
		},
		async createCategory({ commit, dispatch }, { title, limit }) {
			try {
				const uid = await dispatch('getUid');
				const category = await firebase
					.database()
					.ref(`/users/${uid}/categories`)
					.push({ title, limit });
				return { title, limit, id: category.key };
			} catch (e) {
				commit('setError', e);
				throw e;
			}
		}
	}
};
