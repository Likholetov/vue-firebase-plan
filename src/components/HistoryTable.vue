<template>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Сумма</th>
				<th>Дата</th>
				<th>Категория</th>
				<th>Тип</th>
				<th>Открыть</th>
				<th>Удалить</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(record, idx) of records" :key="record.id">
				<td>{{ idx + 1 }}</td>
				<td>{{ record.amount | currency('RUB') }}</td>
				<td>{{ record.date | date('datetime') }}</td>
				<td>{{ record.categoryName }}</td>
				<td>
					<span
						class="white-text badge"
						:class="[record.typeClass]"
						>{{ record.typeText }}</span
					>
				</td>
				<td>
					<button
						class="btn-small btn"
						@click="$router.push(`/detail/${record.id}`)"
					>
						<i class="material-icons">open_in_new</i>
					</button>
				</td>
				<td>
					<button
						class="btn-small red btn"
						@click="deleteRecord(record.id)"
					>
						<i class="material-icons">delete_outline</i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: {
		records: {
			required: true,
			type: Array
		}
	},
	methods: {
		async deleteRecord(id, idx) {
			try {
				await this.$store.dispatch('removeRecordById', id);
				this.$emit('deleted');
			} catch (e) {}
		}
	}
};
</script>
