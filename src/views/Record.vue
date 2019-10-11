<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <Loader v-if="loading"/>

        <form @submit.prevent="submitHandler" class="form" v-else>
            <div class="input-field" >
                <select>
                    <option
                    >name cat</option>
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
                    />
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input
                        id="amount"
                        type="text"
                >
                <label for="amount">Сумма</label>
                <span class="helper-text invalid">amount пароль</span>
            </div>

            <div class="input-field">
                <input
                        id="description"
                        type="text"
                >
                <label for="description">Описание</label>
                <span
                        class="helper-text invalid">description пароль</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Record",
        data: () => ({
            categories: [],
            select: null,
            loading: true,
        }),
        methods: {
            async submitHandler(){
                if (this.$v.$invalid){
                    this.$v.$touch();
                    return
                }

                try {

                } catch (e) {}
            }
        },
        async mounted(){
            this.categories = await this.$store.dispatch('fetchCategories');
            this.loading = false;
            
            this.select = M.FormSelect.init(this.$refs.select);
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