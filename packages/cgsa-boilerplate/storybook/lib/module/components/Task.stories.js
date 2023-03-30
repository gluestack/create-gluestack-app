import React from 'react';
import Task from './Task';
export default {
  component: Task,
  title: 'Task'
};
const Template = args => /*#__PURE__*/React.createElement(Task, args);
export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX'
  }
};
export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED'
  }
};
export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED'
  }
};
//# sourceMappingURL=Task.stories.js.map