// @ts-nocheck

import { Text } from 'react-native';
import { styled } from '../../styled';

export default styled(
  Text,
  {
    'color': '$textLight600',
    'fontFamily': '$body',
    'ml': '$2',
    ':checked': {
      color: '$textLight900',
    },
    ':hover': {
      'color': '$textLight900',

      ':checked': {
        color: '$textLight900',
      },
    },
    ':active': {
      'color': '$textLight900',

      ':checked': {
        color: '$textLight900',
      },
    },

    ':disabled': {
      opacity: 0.6,
    },

    '_web': {
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      msUserSelect: 'none',
    },

    '_dark': {
      'color': '$textDark400',
      ':checked': {
        color: '$textDark100',
      },
      ':hover': {
        'color': '$textDark100',

        ':checked': {
          color: '$textDark100',
        },
      },
      ':active': {
        'color': '$textDark100',

        ':checked': {
          color: '$textDark100',
        },
      },
    },
  },
  {
    ancestorStyle: ['_text'],
  }
);
