<script lang="ts">
import { ChartTypeRegistry } from 'chart.js'
import { defineComponent } from 'vue'
import { Slide } from './types/slides'

export default defineComponent({
  props: {
    slide: {
      type: Object as () => Slide<keyof ChartTypeRegistry | null>,
    },
  },
})
</script>
