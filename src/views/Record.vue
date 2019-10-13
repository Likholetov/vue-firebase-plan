<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <Loader v-if="loading"/>

        <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию.</router-link></p>

        <form @submit.prevent="submitHandler" class="form" v-else>
            <div class="input-field" >
                <select ref="select" v-model="category">
                    <option
                        v-for="c in categories"
                        :key="c.id"
                        :value="c.id"
                    >{{ c.title }}</option>
                </select>
                <label>Выберите категорию</label>
            </div>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="income"
                            v-model="type"
                    />
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="outcome"
                            v-model="type"
                    />
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input
                    id="amount"
                    type="text"
                    v-model.number="amount"
                    :class="{invalid: ($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue)}"
                >
                <label for="amount">Сумма</label>
                <span class="helper-text invalid"
                        v-if="$v.amount.$dirty && !$v.amount.required"
                >Введите сумму</span>
                <span class="helper-text invalid"
                        v-if="$v.amount.$dirty && !$v.amount.minValue"
                >Сумма не должна быть менее {{$v.amount.$params.minValue.min}}</span>
            </div>

            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model.trim="description"
                        :class="{invalid: $v.description.$dirty && !$v.description.required}"
                >
                <label for="description">Описание</label>
                <span class="helper-text invalid"
                          v-if="$v.description.$dirty && !$v.description.required"
                    >Введите описание</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators';
    import {mapGetters} from 'vuex';

    export default {
        name: "Record",
        data: () => ({
            categories: [],
            select: null,
            loading: true,
            category: null,
            type: 'outcome',
            amount: '',
            description: ''
        }),
        validations: {
            description: {required},
            amount: {required, minValue: minValue(1)},
        },
        computed: {
            ...mapGetters(['info']),
            canCreateRecord(){
                if (this.type === 'income') {
                    return true;
                }

                return this.info.bill >= this.amount;
            }
        },
        methods: {
            async submitHandler(){
                if (this.$v.$invalid){
                    this.$v.$touch();
                    return;
                }

                if (this.canCreateRecord) {
                    try {
                        await this.$store.dispatch('createRecord', {
                            categoryId: this.category,
                            amount: this.amount,
                            description: this.description,
                            type: this.type,
                            date: new Date().toJSON()
                        });

                        const bill = this.type === 'income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount;

                        await this.$store.dispatch('updateInfo', {bill});
                        this.$message(`Запись успешно создана. На вашем счету ${bill}.`);
                        this.$v.$reset();
                        this.amount = '';
                        this.description = '';
                    } catch (e) {
                        
                    }
                } else {
                    this.$message(`Недостаточно средств на счету (${this.amount - this.info.bill})`);
                }
            }
        },
        async mounted(){
            this.categories = await this.$store.dispatch('fetchCategories');
            this.loading = false;

            if (this.categories.length) {
                this.category = this.categories[0].id;
            }
            
            setTimeout(() => {
                this.select = M.FormSelect.init(this.$refs.select);
                M.updateTextFields();
            }, 0);
        },
        destroyed(){
            if (this.select && this.select.destroy) {
                this.select.destroy();
            }
        }
    }
</script>

<style scoped>

</style>