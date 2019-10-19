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
                        :class="{invalid: $v.name.$dirty && !$v.name.required}"
                >
                <label for="description">Имя</label>
                <span class="helper-text invalid"
                          v-if="$v.name.$dirty && !$v.name.required"
                    >Поле не должно быть пустым</span>
            </div>

            <div class="switch">
                <label>
                    English
                    <input type="checkbox">
                    <span class="lever"></span>
                    Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "Profile",
        data: () => ({
            name: ''
        }),
        validations: {
            name: {required},
        },
        mounted(){
            this.name = this.info.name;
            setTimeout(() => {
                M.updateTextFields();
            }, 0);
        },
        computed: {
            ...mapGetters(['info'])
        },
        methods: {
            submitHandler(){
                if (this.$v.$invalid){
                    this.$v.$touch();
                    return;
                };

                try {                   
                } catch (e) {
                    
                }
            }
        }
    }
</script>

<style scoped>
    .switch{
        margin-bottom: 2rem;
    }
</style>