"use client"

import React from 'react';

const TestComponent: React.FC = () => {
 
  return (
    <div className='bg-slate-300 h-screen' >

      <div className='ml-8'>

        <h1>Hello</h1><br />



        <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
          Button
        </button>

        <h1>Hello</h1><br />

        <button className="btn">Button</button>


        <h1>Hello</h1><br />


        <button className="btn btn-warning">Warning</button>

        <h1>Hello</h1><br />


        {/* The button to open modal */}
        <label htmlFor="my_modal_7" className="btn">open modal</label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">This modal works with a hidden checkbox!</p>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>
      
      </div>


      <h1>Hello</h1><br />


      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>


    
    </div>
  );
};

export default TestComponent;



