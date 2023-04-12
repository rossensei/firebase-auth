<script setup>
import { ref, onMounted } from 'vue'
import {db} from '../firebase/firebase.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { auth } from '../firebase/firebase.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink } from 'vue-router'
import router from '../router'
const users = ref([])
const id = ref(1)
const totalFemaleUsers = ref(0)
const totalMaleUsers = ref(0)
onMounted(async()=>{
    const q = (collection(db, "users"));
    onSnapshot(q,(snapshot)=> {
    const usersTmp = []
    let femaleCount = 0
    let maleCount = 0
    snapshot.forEach((doc) => {
    const users = {
        id: doc.id,
        fullname: doc.data().fullname,
        address: doc.data().address,
        gender: doc.data().gender,
        email: doc.data().email,
        contactno: doc.data().contactno
    }
    usersTmp.push(users)
    if(users.gender == 'Female'){
        femaleCount++
    }
    if(users.gender == 'Male'){
        maleCount++
    }
    });
    users.value = usersTmp
    totalFemaleUsers.value = femaleCount
    totalMaleUsers.value = maleCount
    })
})
</script>

<template>
    <!-- <h1 class="text-4xl font-bold">DASHBOARD</h1> -->
    <div class="h-screen w-full px-20">

        <div class="mt-5 w-4/5 mx-auto">

            <div class="w-3/4 mx-auto mt-11">
                <h1 class="text-4xl font-bold text-black">Dashboard</h1>
                <div class="grid grid-cols-3 gap-3 mt-10">
                    
                    <div class="flex flex-col p-5 bg-blue-500 rounded-lg">
                        <p class="text-xl text-white font-normal text-center">{{ totalMaleUsers }}</p>
                        <p class="text-xl text-white font-semibold text-center">Total Male Users</p>
                    </div>
                    <div class="flex flex-col p-5 bg-pink-300 rounded-lg">
                        <p class="text-xl text-white font-normal text-center">{{ totalFemaleUsers }}</p>
                        <p class="text-xl text-white font-semibold text-center">Total Female Users</p>
                    </div>
                    <div class="flex flex-col p-5 bg-green-500 rounded-lg">
                        <p class="text-xl text-white font-normal text-center">{{ totalMaleUsers + totalFemaleUsers }}</p>
                        <p class="text-xl text-white font-semibold text-center">Total Users</p>
                    </div>
                </div>

                
                <div class="relative overflow-x-auto mt-5">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Contact No.
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" :class="user.gender === 'Male' ? 'text-blue-700' : 'text-pink-300'">
                                    {{ user.fullname }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ user.address }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ user.gender }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ user.email }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ user.contactno }}
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>