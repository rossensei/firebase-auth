<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from './firebase/firebase.js'
import router from './router'

const isSignedIn = ref(false)
const username = ref('')
const userEmail = ref('')

// document.addEventListener('DOMContentLoaded', () => {
//   if(isSignedIn){
//     document.getElementById('user-menu-button').addEventListener('click', () => {
//       const dropdown = document.getElementById('user-dropdown')
//       if(dropdown.classList.contains('hidden')) {
//         dropdown.classList.remove('hidden')
//         dropdown.classList.add('block')
//       } else {
//         dropdown.classList.remove('block')
//         dropdown.classList.add('hidden')
//       }
//     })
//   }
// });
onMounted(() => {

  onAuthStateChanged(auth, async (user) => {
    if(user){
      console.log(user)
      isSignedIn.value = true
      console.log('you are now signed in')
      router.push('/dashboard')

      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        username.value = doc.data().fullname
        userEmail.value = doc.data().email
      });
    }else{
      console.log('you need to log in')
      router.push('/')
    }
  })

  if(isSignedIn){
    document.getElementById('user-menu-button').addEventListener('click', () => {
      const dropdown = document.getElementById('user-dropdown')
      if(dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden')
        dropdown.classList.add('block')
      } else {
        dropdown.classList.remove('block')
        dropdown.classList.add('hidden')
      }
    })
  }
})

const logOut = () =>{
  signOut(auth)
  .then(()=>{
    const dropdown = document.getElementById('user-dropdown')
    if(dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden')
      dropdown.classList.add('block')
    } else {
      dropdown.classList.remove('block')
      dropdown.classList.add('hidden')
    }

    isSignedIn.value = false
  })
}
</script>

<template>
  <header>
    
  <nav class="bg-white border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <RouterLink to="/" class="flex items-center">
        <img src="https://cdn.dribbble.com/users/528264/screenshots/3140440/firebase_logo.png" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Midterm Project</span>
    </RouterLink>
    <div v-show="isSignedIn" class="flex items-center md:order-2">
        <div class="relative">
          <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user photo">
          </button>
          <!-- Dropdown menu -->
          <div class="z-50 absolute hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow top-6 right-0" id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">{{ username }}</span>
              <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ userEmail }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="logOut()">Sign out</a>
              </li>
            </ul>
          </div>
        </div>
        <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
        <li v-if="!isSignedIn">
          <RouterLink to="/login" class="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:hover:text-blue-700 md:p-0">Login</RouterLink>
        </li>
        <li v-if="isSignedIn">
          <RouterLink to="/" class="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:hover:text-blue-700 md:p-0">Home</RouterLink>
        </li>
        <li v-if="isSignedIn">
          <RouterLink to="/dashboard" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Dashboard</RouterLink>
        </li>
        <li v-if="isSignedIn">
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Services</a>
        </li>
      </ul>
    </div>
    </div>
  </nav>

  </header>

  <RouterView />
</template>
