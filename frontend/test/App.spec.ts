import App from '../src/App'
import NewTaskInput from '../src/components/NewTaskInput'
import TodoList from '../src/components/TodoList'
import {shallow} from 'vue-test-utils'
import store from '../src/store';
import {Actions} from "../src/store/actions";


describe('App.vue', () => {
  it('renders', () => {
    store.replaceState({ tasks: [ {} ] });
    store.dispatch = jest.fn();
    const wrapper = shallow(App, {store});
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find(NewTaskInput).vm).toBeDefined();
    expect(wrapper.find(TodoList).vm.tasks.length).toBe(1);
    expect(store.dispatch).toHaveBeenCalledWith({type: Actions.FetchTasks});
  });
});
