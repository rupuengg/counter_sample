import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Counter from './Counter';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

function setup(value = 0){
  const actions = {
    onIncrement: jest.fn(),
    onDecrement: jest.fn()
  };

  const component = shallow(
    <Counter value={value} {...actions} />
  );

  return {
    component: component,
    actions: actions,
    buttons: component.find('button'),
    p: component.find('p')
  };
}

console.log(setup());

describe('Counter component', () => {
  it('should display count', () => {
    const { p } = setup();
    expect(p.text()).toMatch(/^Clicked: 0 times/);
  });

  it('first button should call Increment', () => {
    const { buttons, actions } = setup();
    buttons.at(0).simulate('click');
    expect(actions.onIncrement).toBeCalled();
  });

  it('second button should call Decrement', () => {
    const { buttons, actions } = setup();
    buttons.at(1).simulate('click');
    expect(actions.onDecrement).toBeCalled();
  });

  it('thrid button should not call onIncrement if the counter is even', () => {
    const { buttons, actions } = setup(42);
    buttons.at(2).simulate('click');
    expect(actions.onIncrement).not.toBeCalled();
  });

  it('third button should call onIncrement if the number is odd', () => {
    const { buttons, actions } = setup(43);
    buttons.at(2).simulate('click');
    expect(actions.onIncrement).toBeCalled();
  });

  it('third button should call onIncrement if the counter is odd and negative', () => {
    const { buttons, actions } = setup(-43);
    buttons.at(2).simulate('click');
    expect(actions.onIncrement).toBeCalled();
  });

  it('fourth button should call onIncrement in a second', () => {
    const { buttons, actions } = setup();
    buttons.at(3).simulate('click');
    setTimeout(
      () => {
        expect(actions.onIncrement).toBeCalled();
        done();
      }, 1000
    );
  });
});
