<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<Loader v-if="loading" />
			<div class="row" v-else>
				<CategoryCreate @created="addNewCategory" />

				<CategoryEdit
					v-if="categories.length"
					:categories="categories"
					:key="categories.length + updateCount"
					@updated="updateCategories"
					@deleted="deleteCategory"
				/>

				<p class="center" v-else>Вы не добавляли категорий</p>
			</div>
		</section>
	</div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate';
import CategoryEdit from '../components/CategoryEdit';
import { log } from 'util';

export default {
	metaInfo() {
		return {
			title: this.$title('Категории')
		};
	},
	name: 'categories',
	data: () => ({
		categories: [],
		loading: true,
		updateCount: 0
	}),
	components: {
		CategoryCreate,
		CategoryEdit
	},
	async mounted() {
		this.categories = await this.$store.dispatch('fetchCategories');
		this.loading = false;
	},
	methods: {
		addNewCategory(category) {
			this.categories.push(category);
		},
		updateCategories(category) {
			const idx = this.categories.findIndex(c => c.id === category.id);
			this.categories[idx].title = category.title;
			this.categories[idx].limit = category.limit;
			this.updateCount++;
		},
		async deleteCategory() {
			this.categories = await this.$store.dispatch('fetchCategories');
		}
	}
};
</script>
