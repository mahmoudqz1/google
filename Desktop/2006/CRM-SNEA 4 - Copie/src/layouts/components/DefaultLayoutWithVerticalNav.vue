<script lang="ts" setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import { db } from '@/firebaseConfig'

import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// Banner
const vuetifyTheme = useTheme()

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})

// Reactive property to store user role
const userRole = ref(null)

onAuthStateChanged(getAuth(), async user => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists())
      userRole.value = userDoc.data().role
    else
      console.error('No such document!')
  }
  else {
    userRole.value = null
  }
})
</script>

<template>
  <VerticalNavLayout>
    <!-- Navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- Search -->
        <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
        >
          <!-- Search Trigger button -->
          <IconBtn>
            <VIcon icon="bx-search" />
          </IconBtn>

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Search</span>
            <span class="meta-key">&#8984;K</span>
          </span>
        </div>

        <VSpacer />

        <IconBtn
          class="me-2"
          href="https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VIcon icon="bxl-github" />
        </IconBtn>

        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />
      <!--
        <VerticalNavLink
        :item="{
        title: 'Account Settings',
        icon: 'mdi-account-cog-outline',
        to: '/account-settings',
        }"
        />
      -->

      <!-- Pages -->
      <VerticalNavSectionTitle :item="{ heading: 'Registration' }" />
      <VerticalNavLink
        :item="{
          title: 'Login',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Register',
          icon: 'bx-user-plus',
          to: '/register',
        }"
      />
      <VerticalNavSectionTitle :item="{ heading: 'Leads' }" />
      <VerticalNavLink
        :item="{
          title: 'AddLead',
          icon: 'bx-user-plus',
          to: '/AddLead',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Lead',
          icon: 'bxl-google',
          to: '/Lead',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'ReceivedLead',
          icon: 'bxl-google',
          to: '/ReceivedLead',
        }"
      />
      <VerticalNavSectionTitle :item="{ heading: 'Informations' }" />
      <VerticalNavLink
        :item="{
          title: 'devoirs',
          icon: 'bxs-file-doc',
          to: '/devoirs',
        }"
      />
      <!--
        <VerticalNavLink
        :item="{
        title: 'MyForm',
        icon: 'bx-file',
        to: '/MyForm',
        }"
        />
      -->
      <VerticalNavLink
        v-if="userRole === 'Admin'"
        :item="{
          title: 'contracts',
          icon: 'bx-file',
          to: '/contracts',
        }"
      />
      <VerticalNavLink
        v-if="userRole === 'Admin'"
        :item="{
          title: 'utilisateurs',
          icon: 'bx-user',
          to: '/utilisateurs',
        }"
      />
    </template>

    <template #after-vertical-nav-items>
      <!-- Illustration -->
      <a
        href="https://themeselection.com/item/sneat-vuetify-vuejs-admin-template"
        target="_blank"
        rel="noopener noreferrer"
        style="margin-left: 7px;"
      />
    </template>

    <slot />

    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
