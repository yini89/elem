<template>
  <div class="cartControl">
    <transition name="move">
      <div class="count-decrease" v-if="food.count > 0" @click="decreaseCount">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>
    <span class="count" v-if="food.count > 0">{{food.count}}</span>
    <span @click.stop.prevent="addCount" class="icon-add_circle"></span>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object,
        default() {
          return {
            count: 0
          };
        }
      }
    },
    methods: {
      addCount(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCount(event) {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
      }
    }
  };
</script>

<style scoped lang="stylus">
  .cartControl
    font-size: 0
    .count-decrease
      display: inline-block
      vertical-align: top
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s
        transform: translate3d(0, 0, 0)
        .icon-remove_circle_outline
          transition: all 0.4s
          transform: rotate(0)
      &.move-enter, &.move-leave-to
        transform: translate3d(24px, 0, 0)
        .icon-remove_circle_outline
          transform: rotate(180deg)
      .icon-remove_circle_outline
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
    .count
      display: inline-block
      width: 24px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      vertical-align: top
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
