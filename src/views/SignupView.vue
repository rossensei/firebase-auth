<script setup>
import { ref } from 'vue'
import {db} from '../firebase/firebase.js'
import {addDoc, collection} from "firebase/firestore";
import { auth } from '../firebase/firebase.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink } from 'vue-router'
import router from '../router'

const fullname = ref('')
const address = ref('')
const gender = ref('')
const email = ref('')
const contactno = ref('')
const password = ref('')

const error = ref('')
const errorMsg = ref('')
const success = ref('')
const successMsg = ref('')

const register = async () => {
    if(fullname.value != '' && address.value != '' && gender.value != '' && email.value != '' && contactno.value != null && password != ''){
        
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async(cred)=>{

            await addDoc (collection(db,"users"),{
            fullname:fullname.value,
            address: address.value,
            gender: gender.value,
            email: email.value,
            contactno: contactno.value,
            uid: cred.user.uid
            })
            fullname.value = ''
            address.value = ''
            gender.value = ''
            email.value = ''
            contactno.value = null
            password.value = null
            email.value = ""
            password.value = ""
            error.value = false
            success.value = true
            successMsg.value = "Registered Successfully"
        })
        .catch(()=>{
            error.value  = true
            errorMsg = "Invalid Email"
        })
    }
    else{
        error.value = true
        errorMsg.value = "Please fill out all the fields"
    }
    
}
</script>

<template>
    <div class="h-auto w-full">
        <div class="flex justify-center items-center h-full">
            <div class="w-1/4 bg-gray-50 rounded-lg shadows-sm px-10 py-5 mt-10">
                <h1 class="text-center text-xl font-bold mb-3">Create User</h1>
                <div v-if="errorMsg" class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">Oops!</span> {{ errorMsg }}
                    </div>
                </div>

                <div class="mb-4">
                    <label class="text-sm" for="email">Full Name</label>
                    <input v-model="fullname" id="email" type="text" class="w-full px-1.5 py-1 rounded-lg text-sm border focus:outline-blue-600">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="address">Address</label>
                    <input v-model="address" id="address" type="text" class="w-full px-1.5 py-1 rounded-lg text-sm border focus:outline-blue-600">
                </div>
                <div class="flex flex-col mb-4">
                    <label class="text-sm" for="gender">Gender</label>
                    <select v-model="gender" name="gender" id="gender" class="w-full px-1.5 py-1 rounded-lg text-sm border focus:outline-blue-600">
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="email">Email Address</label>
                    <input v-model="email" id="email" type="text" class="w-full px-1.5 py-1 rounded-lg text-sm border focus:outline-blue-600">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="contactno">Contact Number</label>
                    <input v-model="contactno" id="contactno" type="text" class="w-full px-1.5 py-1 rounded-lg text-sm border focus:outline-blue-600">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="password">Password</label>
                    <input v-model="password" id="password" type="password" class="w-full px-1.5 py-1 rounded-lg text-sm border focus:outline-blue-600">
                </div>
                <button @click="register()" class="w-full py-1 bg-blue-600 rounded-lg text-white hover:bg-blue-500">Create</button>
            </div>

        </div>
    </div>
</template>