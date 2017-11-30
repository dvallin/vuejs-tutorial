import TodoListItem from '../../src/components/TodoListItem'
import {Task, TaskState} from "../../src/domain/Task";
import store from '../../src/store'
import {mount} from 'vue-test-utils'
import {Actions} from "../../src/store/actions";

describe('TodoListItem.vue', () => {
  it('renders', () => {
    const wrapper = mount(TodoListItem, {
      propsData: {
        task: new Task("id", "Some Title")
      }
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('label').text()).toBe("Some Title");
    expect(wrapper.find('input').hasAttribute("type", "checkbox")).toBeTruthy();
  });

  describe('checkbox', () => {
    it('is checked if task is done', () => {
      const task = new Task("id", "Some Title");
      task.state = TaskState.Done;
      const wrapper = mount(TodoListItem, { propsData: { task } });
      expect(wrapper.find('input').element.checked).toBeTruthy();
    });

    it('is not checked if task is not done', () => {
      const task = new Task("id", "Some Title");
      const wrapper = mount(TodoListItem, {  propsData: { task } });
      expect(wrapper.find('input').element.checked).toBeFalsy();
    });

    it('dispatches task state change', (done) => {
      const spy = jest.spyOn(store, 'dispatch');
      const givenTitle = "title";

      const wrapper = mount(TodoListItem, {
        store,
        propsData: {
          task: new Task("id", givenTitle)
        }
      });

      wrapper.find('input').trigger('click');

      wrapper.vm.$nextTick(() => {
        expect(spy).toHaveBeenCalledWith({
          type: Actions.SetTaskComplete,
          title: givenTitle,
          complete: true
        });
        done();
      });
    });
  });
});
