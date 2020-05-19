<template>
  <div id="app">
    <v-navigation-drawer
      color="primary"
      absolute
      dark
      :permanent="true"
      expand-on-hover
    >
      <v-list
        dense
        nav
      >
        <v-list-item-group v-model="selected" color="secondery">
          <v-list-item
            class="my-2"
            v-for="item in items"
            :key="item.title"
            link
            @click='$router.push({name: item.route}).catch({})'
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            
          </v-list-item>
        </v-list-item-group>

      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: 'SideBar',

  props: {
    items: Array,
  },

  data: () => ({
    selected: 0,
  })
}
</script>
