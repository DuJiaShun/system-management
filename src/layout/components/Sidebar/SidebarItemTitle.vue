<script lang="tsx">
type MenuItemProps = {
  icon: string
  title: string
}
const MenuItem = (props: MenuItemProps) => {
  const { icon, title } = props
  const vnodes = []
  if (icon) {
    if (icon.includes('el-icon')) {
      vnodes.push(<i class={[icon, 'sub-el-icon']} />)
    } else {
      vnodes.push(<svg-icon icon-class={icon} />)
    }
  }
  if (title) {
    vnodes.push(<span>{title}</span>)
  }
  return vnodes
}

MenuItem.props = {
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
}
export default MenuItem
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
