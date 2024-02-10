import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { links, social} from '@/navInfo';
import {render, act, waitFor, screen, fireEvent} from '@testing-library/react'


describe.skip("test in the footer", ()=>{
    
    it('test if all the menu links routes are rendered', async () => {
        await act(async () => {
            render(<Footer />);
        })
        
        await waitFor(async ()=>{
            const linkRoutes = await screen.findAllByTestId(/link/i);
            expect(linkRoutes.length).toBe(links.length)     
        })
    });

    it('test if all the social media icons are rendered', async ()=>{
        await act(async () => {
          render(<Footer />);
        })
      
        await waitFor(async () => {
          const socialIcons = await screen.findAllByTestId(/social/i);
          expect(socialIcons.length).toBe(social.length);
        })
      })

    it('test if the newsletter text is rendered', async ()=>{
       await act(async ()=>{
           render(<Newsletter/>)
       })

       const newsletterText = screen.getByText(/Newsletter/i)
       expect(newsletterText).toBeInTheDocument()
    })  

    it('test if you can write a name, lastname and email in the newsletter inputs', async ()=>{
       await act(async ()=> {
        render(<Newsletter/>)
       })
    
       const name = screen.getByPlaceholderText('name')
       const lastName = screen.getByPlaceholderText('lastname')
       const email = screen.getByPlaceholderText('email')
     
       fireEvent.change(name, {target: { value: 'user name'}})
       fireEvent.change(lastName, {target: { value: 'user lastname'}})
       fireEvent.change(email, {target: {value: 'alfredo@gmail.com'}})

       expect(name).toHaveValue('user name')
       expect(lastName).toHaveValue('user lastname')
       expect(email).toHaveValue('alfredo@gmail.com')
    })
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
})