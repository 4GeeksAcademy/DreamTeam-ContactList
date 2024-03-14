import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { IoPersonSharp } from "react-icons/io5"
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import "../../styles/demo.css";


export const AgendaInfo = () => {

	const { user } = useParams();

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getEachContact(user)
	}, [])

	const getRandomColor = () => {
		const backgroundColorArr = ["slateblue", "orange", "rgb(199, 211, 31)", "purple", "red", "aqua", "pink"]
		const color = backgroundColorArr[Math.floor(Math.random() * backgroundColorArr.length)]
		return color
	}

	const getInitials = (fullName) => {
		let nameArr = []
		let initials = ""
		if (fullName !== "") nameArr = fullName.split(" ")
		if (nameArr.length > 1) initials = (nameArr[0][0] + nameArr[1][0]).toUpperCase()
		if (nameArr.length === 1) initials = (nameArr[0][0]).toUpperCase()

		return initials
	}

	return (
		<div className="content-wrapper">
			<div className="container mt-2">
				<Link to="/" className="btn btn-danger me-2 mt-3">Back To Gossip</Link>
				<Link to={"/newcontact/" + user} className="btn btn-primary mt-3">Add new contact</Link>
			</div>

			<div className="container mt-3">
				{
					store.eachContact.map((contact) => {
						return (
							<div key={contact.id} className="border contact-wrapper" style={{ padding: '2rem', }}>
								{/* <div className="avatar" style={{ backgroundColor: getRandomColor() }}>{contact.full_name !== "" ? <span className="avatar-letters">{getInitials(contact.full_name)}</span> : <IoPersonSharp className="svg" />}</div> */}
								<div className="avatar"></div>
								<div className="ps-2">
									<h1 className="mb-2">{contact.full_name}</h1>
									<p className="mb-2" style={{ color: "#72797f" }}><IoLocationSharp className="me-2" style={{ color: "#72797f" }} />{contact.address}</p>
									<p className="mb-2" style={{ color: "#72797f" }}><FaPhone className="me-2" style={{ color: "#72797f" }} />{contact.phone}</p>
									<p className="mb-2" style={{ color: "#72797f" }}><MdEmail className="me-2" style={{ color: "#72797f" }} />{contact.email}</p>
								</div>
								<div className="text-end">
									<button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => actions.getContactInfo(contact.id)} style={{ border: 'none', backgroundColor: 'white' }}>
										<FaPencilAlt name="pencil-outline" style={{ fontSize: "20px", background: "white" }} />
									</button>
									<button onClick={() => actions.getContactInfo(contact.id)} style={{ border: 'none', backgroundColor: 'white' }} type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">
										<FaTrashCan name="trash-outline" style={{ fontSize: "20px", background: "white" }} />
									</button>
								</div>
							</div>
						)
					})
				}

				<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">{`Edit Info`}</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body d-flex flex-column">
								<input className="form-control mb-2" placeholder="Name" value={store.currentUserData.full_name} name="full_name" onChange={(event) => actions.changeContactInfo(event)}></input>
								<input className="form-control mb-2" placeholder="Email" value={store.currentUserData.email} name="email" onChange={(event) => actions.changeContactInfo(event)}></input>
								<input className="form-control mb-2" placeholder="Address" value={store.currentUserData.address} name="address" onChange={(event) => actions.changeContactInfo(event)}></input>
								<input className="form-control mb-2" placeholder="Phone number" value={store.currentUserData.phone} name="phone" onChange={(event) => actions.changeContactInfo(event)}></input>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button onClick={() => actions.updateContactInfo(store.currentUserData.id)} data-bs-dismiss="modal" type="button" className="btn btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModal" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Are you sure?</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								If you delete this thing the entire universe will go down!
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Oh no, how dare you!</button>
								<button onClick={() => actions.deleteContact()} data-bs-dismiss="modal" type="button" className="btn btn-primary">Yes baby, do it!</button>
							</div>
						</div>
					</div>
				</div>
			</div >

		</div>
	);
};