<template>
	<div>
		<div class="page-title">
			<h3>Профиль</h3>
		</div>

		<form @submit.prevent="submitHandler" class="form">
			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model="name"
					:class="{ invalid: $v.name.$dirty && !$v.name.required }"
				/>
				<label for="description">Имя</label>
				<span
					class="helper-text invalid"
					v-if="$v.name.$dirty && !$v.name.required"
					>Поле не должно быть пустым</span
				>
			</div>

			<div class="input-field">
				<input
					id="bill"
					type="text"
					v-model.number="bill"
					:class="{
						invalid:
							($v.bill.$dirty && !$v.bill.required) ||
							($v.bill.$dirty && !$v.bill.minValue)
					}"
				/>
				<label for="bill">Счет ₽</label>
				<span
					class="helper-text invalid"
					v-if="$v.bill.$dirty && !$v.bill.required"
					>Введите сумму</span
				>
				<span
					class="helper-text invalid"
					v-if="$v.bill.$dirty && !$v.bill.minValue"
					>Сумма не должна быть менее
					{{ $v.bill.$params.minValue.min }}</span
				>
			</div>

			<div class="input-field">
				<input
					id="delta"
					type="text"
					v-model.number="delta"
					:class="{
						invalid:
							($v.delta.$dirty && !$v.delta.required) ||
							($v.delta.$dirty && !$v.delta.minValue) ||
							($v.delta.$dirty && !$v.delta.maxValue)
					}"
				/>
				<label for="delta">Дельта %</label>
				<span
					class="helper-text invalid"
					v-if="$v.delta.$dirty && !$v.delta.required"
					>Введите дельту</span
				>
				<span
					class="helper-text invalid"
					v-if="$v.delta.$dirty && !$v.delta.minValue"
					>Дельта не должна быть менее
					{{ $v.delta.$params.minValue.min }} %</span
				>
				<span
					class="helper-text invalid"
					v-if="$v.delta.$dirty && !$v.delta.maxValue"
					>Дельта не должна быть более
					{{ $v.delta.$params.maxValue.max }} %</span
				>
			</div>

			<div class="input-field">
				<input
					id="deltaAmount"
					type="text"
					v-model.number="deltaAmount"
					:class="{
						invalid:
							($v.deltaAmount.$dirty &&
								!$v.deltaAmount.required) ||
							($v.deltaAmount.$dirty && !$v.deltaAmount.minValue)
					}"
				/>
				<label for="delta">Дельта ₽</label>
				<span
					class="helper-text invalid"
					v-if="$v.deltaAmount.$dirty && !$v.deltaAmount.required"
					>Введите дельту</span
				>
				<span
					class="helper-text invalid"
					v-if="$v.deltaAmount.$dirty && !$v.deltaAmount.minValue"
					>Дельта не должна быть менее
					{{ $v.deltaAmount.$params.minValue.min }}</span
				>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Обновить
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required, minValue, maxValue } from 'vuelidate/lib/validators';

export default {
	name: 'Profile',
	metaInfo() {
		return {
			title: this.$title('Профиль')
		};
	},
	data: () => ({
		name: '',
		bill: '',
		delta: '',
		deltaAmount: ''
	}),
	validations: {
		name: { required },
		bill: { required, minValue: minValue(0) },
		delta: { required, minValue: minValue(1), maxValue: maxValue(99) },
		deltaAmount: { required, minValue: minValue(0) }
	},
	mounted() {
		this.name = this.info.name;
		this.bill = this.info.bill;
		this.delta = this.info.delta;
		this.deltaAmount = this.info.deltaAmount;
		setTimeout(() => {
			M.updateTextFields();
		}, 0);
	},
	computed: {
		...mapGetters(['info'])
	},
	methods: {
		...mapActions(['updateInfo']),
		async submitHandler() {
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}

			try {
				await this.updateInfo({
					name: this.name,
					bill: this.bill,
					delta: this.delta,
					deltaAmount: this.deltaAmount
				});
			} catch (e) {}
		}
	}
};
</script>

<style scoped></style>
