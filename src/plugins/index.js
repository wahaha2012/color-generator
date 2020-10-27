import Vue from "vue";
import {
  Button,
  Input,
  Row,
  Col,
  Form,
  FormItem,
  Switch,
  InputNumber,
  Tooltip
} from "element-ui";

Vue.prototype.$ELEMENT = { size: "medium", zIndex: 3000 };

Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(InputNumber);
Vue.use(Tooltip);
