import NewTaskInput from '../../src/components/NewTaskInput'
import {Actions} from "../../src/store/actions";
import store from '../../src/store'
import {mount, shallow} from 'vue-test-utils'

describe('NewTaskInput.vue', () => {
  it('renders an input field', () => {
    const wrapper = shallow(NewTaskInput);
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('input')).toBeDefined();
  });

  describe('add task', () => {
    it('adds task from trimmed value of input field, if enter key is pressed', (done) => {
      const spy = jest.spyOn(store, 'dispatch');
      const givenValue = "A very special value    ";

      const wrapper = mount(NewTaskInput, { store });
      const input = wrapper.find('input');
      input.element.value = givenValue;
      input.trigger('input');
      input.trigger('keyup.enter');

      wrapper.vm.$nextTick(() => {
        expect(spy).toHaveBeenCalledWith({
          type: Actions.AddTask,
          title: givenValue.trim()
        });
        done();
      });
    });
  });
});
