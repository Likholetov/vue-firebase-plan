<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>

            <form @submit.prevent="submitHandler">
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
                    Создать
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, integer, minValue} from 'vuelidate/lib/validators'

    export default {
        name: "CategoryCreate",
        data: ()=>({
            title: '',
            limit: 1
        }),
        validations: {
            title: {required},
            limit: {required, integer, minValue: minValue(1)},
        },
        mounted(){
            M.updateTextFields()
        },
        methods: {
            submitHandler(){
                if (this.$v.$invalid){
                    this.$v.$touch();
                    return
                }
            }
        }
    }
</script>

<style scoped>

</style>