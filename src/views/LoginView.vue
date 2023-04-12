<script setup>
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { auth } from '../firebase/firebase.js'
import router from '../router'
const email = ref('')
const password = ref('')
const error = ref('')
const errorMsg = ref('')
const login = () => {
  if(email.value != '' && password.value != ''){
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((cred)=>{
      console.log('logged in successfully')
      router.push('/dashboard')
    })
    .catch((err)=>{
      error.value = true
      errorMsg.value = err.message
    })
  } else {
    console.log('email and password fields cannot be empty!')
    errorMsg.value = 'email and password fields cannot be empty!'
  }
}
</script>

<template>
    <div class="h-auto w-full">
        <div class="flex justify-center items-center">
            <div class="w-1/4 bg-gray-50 rounded-lg shadows-sm px-10 py-5 mt-10">
                <h1 class="text-center text-xl font-bold mb-3">Log in to your account</h1>

                <div v-if="errorMsg" class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Info</span>
                    <div>
                      <span class="font-medium">Oops!</span> {{ errorMsg }}
                    </div>
                  </div>
                  
                <div class="mb-4">
                    <label class="text-sm" for="email">Email Address</label>
                    <input v-model="email" id="email" type="text" class="w-full px-1.5 py-1 rounded-lg text-sm">
                </div>
                <div class="mb-4">
                    <label class="text-sm" for="password">Password</label>
                    <input v-model="password" id="password" type="password" class="w-full px-1.5 py-1 rounded-lg text-sm">
                </div>
                <button @click="login()" class="w-full py-1 bg-blue-600 rounded-lg text-white hover:bg-blue-500">Log in</button>
                <div class="flex items-center justify-center mt-5">
                  <p class="text-sm font-light text-center">Don't have an account?</p>&nbsp;
                  <RouterLink to="/create-account" class="text-sm underline font-medium">Create an account</RouterLink>
                </div>
            </div>

        </div>
    </div>
</template>