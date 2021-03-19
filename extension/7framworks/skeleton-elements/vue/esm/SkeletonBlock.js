import { h } from 'vue';
export default {
  name: 'skeleton-block',
  props: {
    tag: {
      type: String,
      "default": 'div'
    },
    width: [String, Number],
    height: [String, Number],
    borderRadius: String,
    effect: String
  },
  render: function render() {
    var _class;

    return h(this.tag, {
      "class": (_class = {
        'skeleton-block': true
      }, _class["skeleton-effect-" + this.effect] = this.effect, _class),
      style: {
        width: this.width,
        height: this.height,
        borderRadius: this.borderRadius
      }
    }, this.$slots["default"] && this.$slots["default"]());
  }
};