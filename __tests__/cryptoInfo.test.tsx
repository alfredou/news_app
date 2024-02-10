import CryptoInfo from '@/components/CryptoInfo';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import {cryptoMock} from '../mocks/cryptoMock'
import { CryptoTypes } from '@/types';

//jest.mock('axios');

//descomentar cuando quite skip
//jest.mock('swr');

describe.skip('CryptoInfo Component', () => {
  it('test if calls the cryptoInfo data', async () => {
    // Configurar la respuesta simulada de axios
    /*(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: cryptoMock,
    } as AxiosResponse);*/
     
    (useSWR as jest.Mock).mockReturnValue({
        data: cryptoMock,
        isLoading: false,
        error: null,
      });
  
    await act(async () => {
      render(<CryptoInfo />);
    });
        expect(useSWR).toHaveBeenCalledTimes(1)

  });

  it('test if the component renders the first item', async ()=>{
    await act(async () => {
      render(<CryptoInfo />);
    });
    
    const name = screen.getByText(/Bitcoin/i)
    const currentPrice = screen.getByText(/42445/i)
    const itemPercentage = screen.getByText(/-1.319/i)

    expect(name).toBeInTheDocument()
    expect(currentPrice).toBeInTheDocument()
    expect(itemPercentage).toBeInTheDocument()
  })

  it('test if the component renders all the crypto items', async ()=>{
    await act(async () => {
      render(<CryptoInfo />);
    });

    const cryptoItems = await screen.findAllByTestId(/crypto/i)
    expect(cryptoItems.length).toBe(cryptoMock.length)
  })

  afterEach(() => {
    jest.clearAllMocks();
  });
  
});



