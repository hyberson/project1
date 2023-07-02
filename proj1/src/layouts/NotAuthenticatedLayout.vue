<template>
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>
            <router-link to="/">Your App</router-link>
          </q-toolbar-title>
          <q-space />
          <q-btn flat label="Sign In" @click="goToSignIn" />
          <q-btn flat label="Sign Up" @click="goToSignUp" />
        </q-toolbar>
      </q-header>
      
      <q-page-container>
        <router-view />
      </q-page-container>
  
      <q-footer elevated>
        <q-toolbar>
          <q-toolbar-title>
            Footer Content
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goToSignIn = () => {
    router.push('/notauthenticated/sign-in')
  }
  
  const goToSignUp = () => {
    router.push('/notauthenticated/sign-up')
  }
  </script>
  