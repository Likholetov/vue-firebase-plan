<template>
	<div class="col s12 m6 l8">
		<div class="card orange darken-3 bill-card">
			<div class="card-content white-text">
				<div class="card-header">
					<span class="card-title">Курс валют</span>
				</div>
				<table>
					<thead>
						<tr>
							<th>Валюта</th>
							<th>Курс</th>
							<th>Дата</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(cur, index) of currencies" :key="cur">
							<td>{{ cur }}</td>
							<td>{{ (rates[index].buy / rates[2].buy).toFixed(2) }}</td>
							<td>{{ date | date('date') }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeCurrency',
	props: ['rates', 'date'],
	data: () => ({
		currencies: ['USD', 'EUR', 'RUB']
	})
};
</script>

<style scoped></style>
