import TodoList from '../../src/components/TodoList'
import TodoListItem from '../../src/components/TodoListItem'
import {Task} from "../../src/domain/Task";
import {shallow} from '@vue/test-utils'

const task = new Task("Some Title");

describe('TodoList.vue', () => {
  it('renders empty lists', () => {
    const cmp = shallow(TodoList,  {
      propsData: {
        tasks: []
      }
    });
    expect(cmp.element).toMatchSnapshot();
    expect(cmp.vm.$el.childNodes.length).toBe(0);
  });

  it('renders three element lists', () => {
    const cmp = shallow(TodoList,  {
      propsData: {
        tasks: [task,task,task]
      }
    });
    expect(cmp.element).toMatchSnapshot();
    expect(cmp.find(TodoListItem).vm.task.title).toEqual('Some Title');
    expect(cmp.findAll(TodoListItem).length).toBe(3);
  });
});
