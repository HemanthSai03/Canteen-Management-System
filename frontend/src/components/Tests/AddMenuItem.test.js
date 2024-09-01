import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AddMenuItem from '../AddMenuItem';
import { ADD_MENU_ITEM } from '../../graphql/queries';

// Mocking the ADD_MENU_ITEM mutation
const mocks = [
  {
    request: {
      query: ADD_MENU_ITEM,
      variables: {
        menuItemInput: {
          name: 'Test Item',
          description: 'A test item',
          price: 10.99,
          category: 'Test Category',
        },
      },
    },
    result: {
      data: {
        addMenuItem: {
          id: '1',
          name: 'Test Item',
          description: 'A test item',
          price: 10.99,
          category: 'Test Category',
        },
      },
    },
  },
];

describe('AddMenuItem', () => {
  test('renders the AddMenuItem form and submits data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddMenuItem />
      </MockedProvider>
    );

    // Ensure all input fields are present
    const nameInput = screen.getByLabelText(/name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const priceInput = screen.getByLabelText(/price/i);
    const categoryInput = screen.getByLabelText(/category/i);
    const submitButton = screen.getByRole('button', { name: /add item/i });

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(descriptionInput, { target: { value: 'A test item' } });
    fireEvent.change(priceInput, { target: { value: '10.99' } });
    fireEvent.change(categoryInput, { target: { value: 'Test Category' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for the mutation to complete
    
  });
});
