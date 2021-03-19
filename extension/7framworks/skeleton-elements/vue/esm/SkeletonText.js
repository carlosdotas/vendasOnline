import { h } from 'vue';
export default {
  name: 'skeleton-text',
  props: {
    tag: {
      type: String,
      "default": 'span'
    },
    effect: String
  },
  render: function render() {
    var _class;

    return h(this.tag, {
      "class": (_class = {
        'skeleton-text': true
      }, _class["skeleton-effect-" + this.effect] = this.effect, _class)
    }, this.$slots["default"] && this.$slots["default"]());
  }
};