import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
// file upload modal form
import axios from 'axios';
import firebase from 'firebase';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import ReCAPTCHA from 'react-google-recaptcha';
import MediaQuery from 'react-responsive';
// modal
import Modal from '../../components/Modal';

import Typing from '../../components/typing';

import { getRandomInt } from '../../utils/numbers';
import { firebaseConfig, airtableConfig, recaptchaConfig } from '../../data/configData';
import { applicationModalData as amd } from '../../data/data';

import './style.scss';

let captcha;
// initialize firebase app
firebase.initializeApp(firebaseConfig);

export default class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formModal: false,
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      linkedIn: '',
      city: '',
      municipality: '',
      cvIsUploading: false,
      cvProgress: null,
      cvUrl: '',
      cvError: '',
      clIsUploading: false,
      clProgress: null,
      clUrl: '',
      clError: '',
      uploadMessage: '',
      uploadStatus: '',
      disabled: true,
      showButton: false,
      isEmailValid: null,
    };
  }

  onRecaptchaChange = () => this.setState({ showButton: true });

  onFormSubmit = () => {
    const { firstName, lastName, city, municipality, email, github, linkedIn, cvUrl, clUrl } = this.state;
    const temp = firstName && lastName && city && email && cvUrl;
    if (city.toLowerCase().trim() === 'sarajevo' ? temp && municipality : temp) {
      const fullName = `${firstName} ${lastName}`;
      axios
        .post(
          airtableConfig.postUrl,
          {
            fields: {
              Attachments: [
                {
                  url: cvUrl,
                  filename: `${fullName} CV`,
                },
                {
                  url: clUrl,
                  filename: `${fullName} Cover Letter`,
                },
              ],
              'Email Address': email,
              'First Name': firstName,
              'Last Name': lastName,
              'Full Name': fullName,
              City: city,
              Municipality: municipality,
              'LinkedIn Account': linkedIn,
              'Github Account': github,
            },
          },
          airtableConfig.headers,
        ).then(() => this.setState({
          uploadMessage: amd.success,
          uploadStatus: 'success',
        }))
        .catch(() => this.setState({
          uploadMessage: amd.error,
          uploadStatus: 'error',
        }));
    } else {
      this.setState({
        uploadMessage: amd.error,
        uploadStatus: 'error',
      });
    }
  };
  getButtonTooltip = () => {
    if (this.state.uploadStatus === '' && this.state.disabled) {
      return 'Please fill required (*) fields and check recaptcha.';
    } else if (this.state.uploadStatus === 'success') {
      return 'Your application has already been successful. No need to do it twice.';
    }
    return undefined;
  };

  openFormModal = () => this.setState({ formModal: true });

  closeFormModal = () => {
    captcha.reset();
    this.setState({
      formModal: false,
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      linkedIn: '',
      city: '',
      municipality: '',
      cvIsUploading: false,
      cvProgress: null,
      cvUrl: '',
      cvError: '',
      clIsUploading: false,
      clProgress: null,
      clUrl: '',
      clError: '',
      uploadMessage: '',
      uploadStatus: '',
      disabled: true,
      showButton: false,
    });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  hasValue = (item) => item !== '';

  checkDisabled = (item, value = '') => {
    const { firstName, lastName, city, municipality, email, cvUrl, clUrl } = this.state;
    const mailIsValid = this.validateEmail(item === 'email' ? value : email);
    const hasValue = this.hasValue(value);
    const checking = (item === 'firstName' ? hasValue : this.hasValue(firstName))
      && (item === 'lastName' ? hasValue : this.hasValue(lastName))
      && (item === 'city' ? hasValue : this.hasValue(city))
      && (item === 'cv' ? hasValue : this.hasValue(cvUrl))
      && (item === 'cl' ? hasValue : this.hasValue(clUrl));
    let municipaliltyCheck = true;
    if (item === 'city' && value.toLowerCase().trim() === 'sarajevo' && municipality === '') {
      municipaliltyCheck = false;
    } else if (item === 'municipality') {
      municipaliltyCheck = hasValue;
    } else if (city.toLowerCase().trim() === 'sarajevo' && municipality === '') {
      municipaliltyCheck = false;
    }
    return !(checking && municipaliltyCheck && mailIsValid);
  };

  // handle form input change value
  handleChangeInput = event => {
    const disabled = this.checkDisabled(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value, disabled });
  };
  handleOnEmailChange = event => {
    const disabled = this.checkDisabled(event.target.name, event.target.value);
    if (this.state.isEmailValid !== null) {
      const valid = this.validateEmail(event.target.value);
      this.setState({ [event.target.name]: event.target.value, disabled, isEmailValid: valid });
    } else {
      this.setState({ [event.target.name]: event.target.value, disabled });
    }
  };
  handleOnBlur = event => {
    console.log('on blur happedning');
    const valid = this.validateEmail(event.target.value);
    this.setState({ isEmailValid: valid });
  }
  // file upload methods
  handleUploadStart = item =>
    this.setState({ [`${item}IsUploading`]: true, [`${item}Progress`]: 0 });

  handleProgress = (progress, item) =>
    this.setState({ [`${item}Progress`]: progress });

  handleUploadError = (error, item) =>
    this.setState({ [`${item}IsUploading`]: false, [`${item}Error`]: error });

  handleUploadSuccess = (filename, item) => {
    firebase
      .storage()
      .ref(firebaseConfig.projectId)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        const disabled = this.checkDisabled(item, url);
        this.setState({
          [`${item}IsUploading`]: false,
          [`${item}Progress`]: 100,
          [`${item}Url`]: url,
          disabled,
        });
      });
  };

  render() {
    return (
      <div className="modal-form">
        <Modal
          visible={this.state.formModal}
          onClose={this.closeFormModal}
          measure="%"
          width={70}
          height={70}
        >
          <h4 className="mb-2">Application form</h4>
          <div className="grid grid-gap-2 grid-cols-2 mb-2">
            <div className="form-group">
              <label htmlFor="firstName" className="block mb-1">
                First name*:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.firstName}
                name="firstName"
                placeholder="Charles"
                id="firstName"
                onChange={this.handleChangeInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="block mb-1">
                Last name*:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.lastName}
                name="lastName"
                placeholder="Xavier"
                id="lastName"
                onChange={this.handleChangeInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city" className="block mb-1">
                City*:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.city}
                name="city"
                placeholder="New York"
                id="city"
                onChange={this.handleChangeInput}
                required
              />
            </div>
            {this.state.city.toLowerCase().trim() === 'sarajevo' && (
              <div className="form-group">
                <label htmlFor="municipality" className="block mb-1">
                  Municipality*:{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.municipality}
                  name="municipality"
                  placeholder="Westchester County"
                  id="municipality"
                  onChange={this.handleChangeInput}
                  required
                />
              </div>
            )}
          </div>
          <div className="grid grid-gap-2 grid-cols-2 mb-2">
            <div className="form-group">
              <label htmlFor="linkedIn" className="block mb-1">
                Linkedin:{' '}
              </label>
              <input
                className="form-control"
                type="url"
                value={this.state.linkedIn}
                name="linkedIn"
                placeholder="https://www.linkedIn.com/in/charles-xavier-7541684/"
                id="linkedIn"
                onChange={this.handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="github" className="block mb-1">
                Github:{' '}
              </label>
              <input
                className="form-control"
                type="url"
                value={this.state.github}
                name="github"
                placeholder="https://github.com/X-Men"
                id="github"
                onChange={this.handleChangeInput}
              />
            </div>
            <div className={`form-group ${this.state.isEmailValid === false ? 'email-error' : ''}`}>
              <label htmlFor="email" className="block mb-1">
                Email*:{' '}
              </label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                name="email"
                placeholder="charles.xavier@x.man"
                id="email"
                onChange={this.handleOnEmailChange}
                onBlur={this.handleOnBlur}
                required
              />
              {this.state.isEmailValid === false &&
              <span className="bold">E-mail is not valid. Please enter valid e-mail.</span>
              }
            </div>
          </div>
          <div className="grid grid-gap-2 grid-cols-2 mb-5">

            <div className="form-group">
              <label htmlFor="cv" className="block mb-1 ">
                CV*:{' '}
              </label>
              <FileUploader
                className="form-control"
                accept="application/msword, text/plain, application/pdf"
                name="cv"
                id="cv"
                randomizeFilename
                storageRef={firebase.storage().ref(firebaseConfig.projectId)}
                onUploadStart={() => this.handleUploadStart('cv')}
                onUploadError={error => this.handleUploadError(error, 'cv')}
                onUploadSuccess={filename =>
                  this.handleUploadSuccess(filename, 'cv')}
                onProgress={progress => this.handleProgress(progress, 'cv')}
              />
              {this.state.cvIsUploading && (
                <p className="block mt-2">Progress: {this.state.cvProgress}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cl" className="block mb-1">
                Cover letter*:{' '}
              </label>
              <FileUploader
                accept="application/msword, text/plain, application/pdf"
                name="coverLetter"
                id="coverLetter"
                randomizeFilename
                storageRef={firebase.storage().ref(firebaseConfig.projectId)}
                onUploadStart={() => this.handleUploadStart('cl')}
                onUploadError={error => this.handleUploadError(error, 'cl')}
                onUploadSuccess={filename =>
                  this.handleUploadSuccess(filename, 'cl')}
                onProgress={progress => this.handleProgress(progress, 'cl')}
              />
              {this.state.clIsUploading && (
                <p className="block mt-2">Progress: {this.state.clProgress}</p>
              )}
            </div>
          </div>
          {this.state.uploadMessage && (
            <div className={`bold ${this.state.uploadStatus} mb-5`}>
              {this.state.uploadMessage}
            </div>
          )}
          <div className="grid grid-gap-2 grid-cols-2" >
            <MediaQuery query="(min-width: 480px)">
              <ReCAPTCHA
                ref={el => {
                  captcha = el;
                }}
                sitekey={recaptchaConfig.siteKey}
                onChange={this.onRecaptchaChange}
              />
            </MediaQuery>
            <MediaQuery query="(max-width: 480px)">
              <ReCAPTCHA
                ref={el => {
                  captcha = el;
                }}
                size="compact"
                sitekey={recaptchaConfig.siteKey}
                onChange={this.onRecaptchaChange}
              />
            </MediaQuery>
            <ReactTooltip />
            <button
              className={`btn form__btn ${this.state.disabled
                ? 'disabled'
                : ''}`}
              onClick={(this.state.disabled || this.state.uploadStatus !== '') ? undefined : this.onFormSubmit}
              data-tip={this.getButtonTooltip()}
            >
              Apply
            </button>
          </div>
        </Modal>
        <div
          className={`hero relative white ${this.props.removeBgOverlay
            ? 'remove-overlay'
            : ''}`}
          style={{
            backgroundImage: `url("/img/mentors/${this.props.bgImage}.jpg")`,
          }}
        >
          {!this.props.removeText && (
            <div className="hero__inner w-100 h-100 mx-auto py-4 px-6 flex flex-start flex-xcenter flex-wrap flex-column">
              <h2 className="hero__title z-1">
                <span className="inline-block">{this.props.data.pretitle}</span>
                <span className="block">{this.props.data.midtitle}</span>
                <div className="block typing__block">
                  <span className="inline-block">
                    {' '}
                    {this.props.data.endtitle}
                  </span>
                  <span className="inline-block block__words">
                    <Typing loop className="typing mx-2" speed={50}>
                      {this.props.data.words.map(word => {
                        const num = getRandomInt(
                          0,
                          this.props.data.colors.length - 1,
                        );
                        const color = this.props.data.colors[num];
                        return (
                          <div
                            style={{ backgroundColor: `${color}` }}
                            className="px-2"
                            key={word.length}
                          >
                            <span>{word}</span>
                            <Typing.Backspace count={word.length + 15} />
                          </div>
                        );
                      })}
                    </Typing>
                  </span>
                </div>
              </h2>
              <div className="block z-1">
                <a
                  onClick={this.openFormModal}
                  role="button"
                  tabIndex="-1"
                  data-tip="You can apply until November 18th, 2017"
                  className="block mt-3 relative z-1 link link--gigi hero__btn hero__btn--active uppercase"
                >
                  <span>WE LIKE THAT. LET'S PUT YOUR TALENTS TO WORK. <span className="bold">APPLY HERE</span></span>
                </a>
              </div>
            </div>
          )}
          {this.props.removeText && (
            <div className="hero__inner w-100 h-100  flex flex-end flex-center black" />
          )}
        </div>
      </div>
    );
  }
}
