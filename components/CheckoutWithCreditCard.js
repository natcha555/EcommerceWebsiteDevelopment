// import React from 'react'
// import Script from 'react-load-script'
// import { useEffect ,useRef , useContext} from 'react'


// let OmiseCard
// console.log(process.env.OMISE_PUBLIC_KEY)

// const CheckoutWithCreditCard = () => {

//     const handleLoadScript = () => {
//       OmiseCard = window.OmiseCard
//       OmiseCard.configure({
//         publicKey: process.env.OMISE_PUBLIC_KEY,
//         currency: 'thb',
//         frameLabel: 'Suitable Shop',
//         submitLabel: 'PAY NOW',
//         buttonLabel: 'Pay with Omise'
//       })
//     }
  
//     const creditCardConfigure = () => {
//       OmiseCard.configure({
//         defaultPaymentMethod: 'credit_card',
//         otherPaymentMethods: []
//       })
//       OmiseCard.configureButton('#credit-card')
//       OmiseCard.attach()
//     }
  
//     const omiseCardHandler = () => {
//       OmiseCard.open({
//         frameDescription: 'Invoice #3847',
//         // amount: amount * 100,
//         onCreateTokenSuccess: token => {
//           console.log(token)
//           //   createCreditCardCharge(user.email, user.name, cart.amount, token)
//         },
//         onFormClosed: () => {}
//       })
//     }
   
//     const handleClick = () => {
//       creditCardConfigure()
//       omiseCardHandler()
//     }


//     return (
//       <div
//         style={{
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: '20px'
//         }}
//       >
//          <Script url='https://cdn.omise.co/omise.js' onLoad={handleLoadScript} />
//         <form>
//           <button
//             style={{
//               padding: '8px 20px',
//               cursor: 'pointer',
//               background: '#333333',
//               border: 'none',
//               fontSize: '18px',
//               color: 'white',
//               borderRadius : '4px',
//             }}
//             id='credit-card'
//             type='button'
//             disabled={false}
//             onClick={handleClick}
//           >
//             Pay with Credit Card
//           </button>
//         </form>
//       </div>
//     )
//   }
  
//   export default CheckoutWithCreditCard