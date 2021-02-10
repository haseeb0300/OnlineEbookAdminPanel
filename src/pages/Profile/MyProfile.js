
import React, { Component } from 'react';

import { connect } from 'react-redux';
import profileimg from '../../assets/images/profile-user (1).png';




var cx = require('classnames');

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

            errors: {},
            serverError: {},
            isLoading: false,
            User_ID:this.props.user?.User_ID,
            Full_Name:'',
            Email:'',
            About:'',
            Date_Of_Birth:'',
            Phone_Num:'',
            profile:{},
            isEditabled:false,


        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {

console.log(this.props.user)
    }

    onEdit = () => {
        this.setState({
            isEditabled:true,
        })
    }

    render() {

        const { isLoading,isEditabled } = this.state;
        const {user} = this.props

        if (isLoading) {
            return (
                <div className="loader-large"></div>
            )
        }

        return (
            <div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-5 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Profile</p>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                                <div className="profileContainer text-center">

                                    <img className="profileimg" src={profileimg}></img>
                                </div>


                            </div>


                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12  mt-3">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 text_align_R mt-3 ">
                                                <label className="profileinputLabel">User name</label>

                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12  mt-3 ">
                                                <input className="profileinput" placeholder="Subject" name='Full_Name' onChange={this.onChange} value={user?.Full_Name} disabled={!isEditabled}></input>

                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 text_align_R mt-3 ">
                                                <label className="profileinputLabel" >Email</label>

                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12   mt-3 ">
                                                <input className="profileinput" placeholder="Subject" name='Email' onChange={this.onChange} value={user?.Email} disabled={!isEditabled}></input>

                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 text_align_R mt-3  ">
                                                <label className="profileinputLabel">Phone Number</label>

                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12 mt-3  ">
                                                <input className="profileinput" placeholder="Subject" name='Phone_Num' onChange={this.onChange} value={user?.Phone_Num} disabled={!isEditabled}></input>

                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 text_align_R mt-3  ">
                                                <label className="profileinputLabel">Date of Birth</label>

                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12 mt-3  ">
                                                <input className="profileinput" placeholder="Subject" name='Date_Of_Birth' onChange={this.onChange} value={user?.Date_Of_Birth} disabled={!isEditabled}></input>

                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 text_align_R mt-3  ">
                                                <label className="profileinputLabel">Account Status</label>

                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12 mt-3  ">
                                                <select className="profileinput" name='Status' onChange={this.onChange} value={user?.Status} disabled={!isEditabled}>
                                                    <option></option>
                                                    <option value='Active'>Active</option>
                                                    <option value='Active'>Deactive</option>

                                                </select>

                                            </div>

                                        </div>


                                    </div>


                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12  mt-3">
                                        <div className="row">

                                            <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 mt-3 text_align_R">
                                                <label className="profileinputLabel">About</label>

                                            </div>

                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12  mt-3 ">
                                                <textarea className="profile_TextArea" name='About' onChange={this.onChange} value={user?.About} disabled={!isEditabled}></textarea>

                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 mt-3 text_align_R">
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12  mt-3 ">

                                                <div className="row">

                                                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6 col-6 text-center mt-3 ">
                                                        <button className="profileEditButton" onClick={this.onEdit} disabled={isEditabled}>Edit</button>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6 col-6 text-center mt-3 ">
                                                        <button className="profileSaveButton" disabled={!isEditabled}>Save</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>





                        </div>


                    </div>


                </div>




            </div>

        )
    }

}

MyProfile.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth,
    user:state.auth.user
});

const mapDispatchToProps = ({


})
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
