import React from 'react';
import Navbar from '@/components/navbar';
import Burger from '@/components/Burger';
import NavMenuPortal from '@/components/NavbarMenu';
import PortalChildMenu from '@/components/PortalChildMenu';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { social } from '@/navInfo';
import { links } from '@/navInfo';

let spy: jest.Mock<any, any, any>

/*
beforeAll(()=>{
  const rootContainer = document.createElement('div');
  rootContainer.id = 'root';
  rootContainer.className = 'h-screen'
  document.body.appendChild(rootContainer);
})*/

describe.skip("test the navbar", ()=>{

  beforeEach(()=>{
    spy = jest.fn()
  // Mock createPortal to prevent errors related to the portal
  /*jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element: React.ReactNode) => element,
}));

// Mock useRouter to provide a mock implementation for Link href
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));*/
})

const NewNavbar = ()=>{
  return <Navbar/>
}
const NewChildMenuPortal = ()=>{
  return <PortalChildMenu handleShowPortal={spy}/>
}

it('test if the main navbar text is displayed', async () => {
  await act(async () => {
    render(<NewNavbar />);
  })
    waitFor(() => {
        const myTitle = screen.getByText(/PcInfo News/i);
        expect(myTitle).toBeInTheDocument();
    });
});

it('test if the burger menu is clickable and shows the info', async ()=>{
    //const spy = jest.fn()
    await act(async () => {
      render(<Burger handleShowPortal={spy}/>)
    })
    const myElement = screen.getByTestId('burger-icon');
    expect(myElement).toBeInTheDocument()
    fireEvent.click(myElement)
    expect(spy).toHaveBeenCalledTimes(1)
})

it('check if it renders child components and if it is clickable in the main sideMenuText pcinfonews', async () => {
  await act(async () => { 
    render(<NewChildMenuPortal />);
  })
    // Ensure that the key components are present
    const titleElement = screen.getByText(/PcInfo News/i)    
    const subtitleElement = screen.getByText(/sections/i);

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    
    fireEvent.click(titleElement)
    expect(spy).toHaveBeenCalledTimes(1)
  });

it('check if all the menu links routes are rendered', async ()=>{
  await act(async () => {
    render(<NewChildMenuPortal />); 
  })

  await waitFor(async ()=>{
     const linkRoutes = await screen.findAllByTestId(/link/i);
     expect(linkRoutes.length).toBe(links.length)     
  })
})

it('check if all the social media icons are rendered', async ()=>{
  await act(async () => {
    render(<NewChildMenuPortal />);
  })

  await waitFor(async () => {
    const socialIcons = await screen.findAllByTestId(/social/i);
    expect(socialIcons.length).toBe(social.length);
  });
})

it('check if all the menu links routes are rendered', async () => {
  await act(async () => {
    render(<NewNavbar />);
  })
  
  await waitFor(async ()=>{
    const linkRoutes = await screen.findAllByTestId(/link/i);
    expect(linkRoutes.length).toBe(links.length)     
  })
 });

 afterEach(() => {
  jest.clearAllMocks();
});
})

/*
it('test if the sideMenu shows the main text', async () => {
  //<PortalChildMenu handleShowPortal={handleSpy}/>
  let handleSpy = jest.fn()

  render(
    <>
    <NavMenuPortal handleShowPortal={spy} showPortal={true}>
      <h1 data-testid="sections">jlsdfljas</h1>
    </NavMenuPortal>
    </>
  )

  // Buscar el h1 dentro del NavbarMenu
  const navbarMenu = screen.getByTestId('navbar-menu');
  const { getByTestId } = within(navbarMenu);
  const myTitle = getByTestId('sections');

  console.log(myTitle);
  expect(myTitle).toBeInTheDocument();
});
*/

