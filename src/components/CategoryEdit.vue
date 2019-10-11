<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field" >
                    <select ref="select" v-model="current">
                        <option
                            v-for="c of categories"
                            :key="c.id"
                            :value="c.id"
                        >{{c.title}}</option>
                    </select>
                    <label>Выберите категорию</label>
                </div>

                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model.trim="title"
                            :class="{invalid: $v.title.$dirty && !$v.title.required}"
                    >
                    <label for="name">Название</label>
                    <span class="helper-text invalid"
                          v-if="$v.title.$dirty && !$v.title.required"
                    >Введите название категории</span>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="text"
                            v-model.trim="limit"
                            :class="{invalid: ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue) || ($v.limit.$dirty && !$v.limit.integer) }"
                    >
                    <label for="limit">Лимит</label>
                    <span class="helper-text invalid"
                          v-if="$v.limit.$dirty && !$v.limit.required"
                    >Введите лимит</span>
                    <span class="helper-text invalid"
                          v-if="$v.limit.$dirty && !$v.limit.integer"
                    >Введите целое число</span>
                    <span class="helper-text invalid"
                          v-if="$v.limit.$dirty && !$v.limit.minValue"
                    >Лимит не должен быть менее {{$v.limit.$params.minValue.min}}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, integer, minValue} from 'vuelidate/lib/validators'

    export default {
        name: "CategoryEdit",
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            select: null,
            title: '',
            limit: 100,
            current: null
        }),
        validations: {
            title: {required},
            limit: {required, integer, minValue: minValue(1)},
        },
        watch: {
            current(catId){
                const {title, limit} = this.categories.find(c => c.id === catId);
                this.title = title;
                this.limit = limit;
            }
        },
        methods: {
            async submitHandler(){
                if (this.$v.$invalid){
                    this.$v.$touch();
                    return
                }

                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    }

					await this.$store.dispatch('updateCategory', categoryData);
                    this.$message('Категория обновлена успешно!');
                    this.$emit('updated', categoryData);
                } catch (e) {}
            }
        },
        created(){
            const {id, title, limit} = this.categories[0];
            this.current = id;
            this.title = title;
            this.limit = limit;
        },
        mounted(){
            this.select = M.FormSelect.init(this.$refs.select);
            M.updateTextFields()
        },
        destroyed(){
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>

<style scoped>

</style>