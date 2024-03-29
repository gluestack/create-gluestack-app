// @ts-nocheck

import { View } from 'react-native';
import { styled } from '../../styled';

export default styled(
  View,
  {
    p: '$2',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    variants: {
      size: {
        lg: {
          _icon: {
            height: '$4',
            width: '$4',
          },

          _text: {
            fontSize: '$lg',
          },

          _indicator: {
            h: '$6',
            w: '$6',
          },
        },

        md: {
          _icon: {
            height: '$3',
            width: '$3',
          },

          _text: {
            fontSize: '$md',
          },

          _indicator: {
            h: '$5',
            w: '$5',
          },
        },

        sm: {
          _icon: {
            height: '$2',
            width: '$2',
          },

          _text: {
            fontSize: '$sm',
          },

          _indicator: {
            h: '$4',
            w: '$4',
          },
        },
      },
    },

    defaultProps: {
      size: 'md',
    },
    _web: {
      ':disabled': {
        cursor: 'not-allowed',
      },
    },
  },
  {
    descendantStyle: ['_icon', '_text', '_indicator'],
  }
);
