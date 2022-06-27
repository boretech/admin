<!--
  Access control component for fine-grained access control.
-->
<script>
import { defineComponent } from 'vue'
import { usePermission } from '@/hooks/web/usePermission.js'
import { getSlot } from '@/utils/helper/tsxHelper.js'
export default defineComponent({
  name: 'Authority',
  props: {
    /**
     * Specified role is visible
     * When the permission mode is the role mode, the value value can pass the role value.
     * When the permission mode is background, the value value can pass the code permission value
     * @default ''
     */
    value: {
      type: [Number, Array, String],
      default: '',
    },
  },
  setup(props, { slots }) {
    const { hasPermission } = usePermission()
    /**
     * Render role button
     */
    const renderAuth = () => {
      const { value } = props
      if (!value) {
        return getSlot(slots)
      }
      return hasPermission(value) ? getSlot(slots) : null
    }
    return () => {
      // Role-based value control
      return renderAuth()
    }
  },
})
</script>