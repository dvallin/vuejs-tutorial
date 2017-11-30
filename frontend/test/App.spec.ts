import App from '../src/App'
import NewTaskInput from '../src/components/NewTaskInput'
import TodoList from '../src/components/TodoList'
import {shallow} from 'vue-test-utils'
import store from '../src/store';


describe('App.vue', () => {
  it('renders', () => {
    store.replaceState({ tasks: [ {} ] });
    const wrapper = shallow(App, {store});
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find(NewTaskInput).vm).toBeDefined();
    expect(wrapper.find(TodoList).vm.tasks.length).toBe(1);
  });
});
