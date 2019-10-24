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
				<span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required"
					>Поле не должно быть пустым</span
				>
			</div>

			<div class="input-field">
				<input
					id="bill"
					type="text"
					v-model.number="bill"
					:class="{
						invalid: ($v.bill.$dirty && !$v.bill.required) || ($v.bill.$dirty && !$v.bill.minValue)
					}"
				/>
				<label for="bill">Счет</label>
				<span class="helper-text invalid" v-if="$v.bill.$dirty && !$v.bill.required">Введите сумму</span>
				<span class="helper-text invalid" v-if="$v.bill.$dirty && !$v.bill.minValue"
					>Сумма не должна быть менее {{ $v.bill.$params.minValue.min }}</span
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
import { required, minValue } from 'vuelidate/lib/validators';

export default {
	name: 'Profile',
	data: () => ({
		name: '',
		bill: ''
	}),
	validations: {
		name: { required },
		bill: { required, minValue: minValue(1) }
	},
	mounted() {
		this.name = this.info.name;
		this.bill = this.info.bill;
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
					bill: this.bill
				});
			} catch (e) {}
		}
	}
};
</script>

<style scoped></style>
