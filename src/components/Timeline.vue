<template>
  <div>
    <v-timeline
      :align-top="alignTop"
      :dense="dense"
    >
      <v-timeline-item
        v-for="(poll, index) in polls"
        :key="poll.type + index"
        :color="poll.color"
        :fill-dot="fillDot"
        :hide-dot="hideDot"
        :icon="icon ? 'mdi-star' : ''"
        :icon-color=" iconColor ? 'deep-orange' : ''"
        :left="left"
        :right="right"
        :small="small"
      >
       <v-card>
        <v-container>
          <DayCard :type="poll.type" :data="poll.barChartData" :index="index"/>
        </v-container>
      </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DayCard from '@/components/DayCard.vue'

export default {
  name: 'Timeline',
  components: {
    DayCard
  },
  data: () => ({
    alignTop: true,
    avatar: false,
    dense: true,
    fillDot: true,
    hideDot: false,
    icon: false,
    iconColor: false,
    left: false,
    reverse: false,
    right: false,
    small: true
  }),
  computed: {
    ...mapState({
      polls: state => {
        return state.polls
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
