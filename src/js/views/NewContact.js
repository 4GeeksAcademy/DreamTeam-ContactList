import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

import "../../styles/global.css";

export const NewContact = () => {

    const { store, actions } = useContext(Context);
    const { user } = useParams();

    return (
        <>
            <div className='container mt-4'>
                <div>
                    <label className="mb-2" style={{ fontWeight: "500" }}>Full name</label>
                    <input required className="form-control mb-4 w-4" type="text" placeholder="Full name" name="full_name" value={store.newUserData.full_name} onChange={(event) => actions.newContactInfo(event, user)}></input>
                    <label className="mb-2" style={{ fontWeight: "500" }}>Email</label>
                    <input className="form-control mb-4" type="text" placeholder="Email" name='email' value={store.newUserData.email} onChange={(event) => actions.newContactInfo(event, user)}></input>
                    <label className="mb-2" style={{ fontWeight: "500" }}>Phone</label>
                    <input className="form-control mb-4" type="text" placeholder="Phone" name='phone' value={store.newUserData.phone} onChange={(event) => actions.newContactInfo(event, user)}></input>
                    <label className="mb-2" style={{ fontWeight: "500" }}>Address</label>
                    <input className="form-control mb-4" type="text" placeholder="Address" name='address' value={store.newUserData.address} onChange={(event) => actions.newContactInfo(event, user)}></input>
                </div>

                <Link to={"/contactLi/" + user} onClick={() => actions.addContact()} className='btn btn-primary mb-2 w-100'>Save</Link>
                <Link to={"/contactLi/" + user} className=" h-100 d-block text-decoration-none">Go back to contacts</Link>
            </div >
        </>

    )
}