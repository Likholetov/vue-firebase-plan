<template>
	<div class="col s12 m6 l4">
		<div class="card light-blue bill-card">
			<div class="card-content white-text">
				<span class="card-title">Счет в валюте</span>

				<p v-for="(cur, index) of currencies" :key="cur" class="currency-line">
					<span>
						{{ getCurrency(index) | currency(cur) }}
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeBill',
	props: ['rates'],
	data: () => ({
		currencies: ['USD', 'EUR', 'RUB']
	}),
	computed: {
		base() {
			return this.$store.getters.info.bill * this.rates[2].buy;
		}
	},
	methods: {
		getCurrency(currency) {
			return this.base / this.rates[currency].buy;
		}
	}
};
</script>

<style scoped></style>
