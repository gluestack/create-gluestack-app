
import React from 'react';

import Task from './Task';

export default {
  component: Task,
  title: 'Task',
};

const Template = () => <Task />;

export const Default: any = Template.bind({});

Default.args = {};
