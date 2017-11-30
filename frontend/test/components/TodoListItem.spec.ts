import TodoListItem from '../../src/components/TodoListItem'
import {Task} from "../../src/domain/Task";
import {mount} from 'vue-test-utils'

describe('TodoListItem.vue', () => {
  it('renders snapshots', () => {
    const cmp = mount(TodoListItem, {
      propsData: {
        task: new Task("Some Title")
      }
    });
    expect(cmp.element).toMatchSnapshot();
    expect(cmp.find('label').text()).toBe("Some Title");
  })
});
