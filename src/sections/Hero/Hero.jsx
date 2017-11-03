import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import MediaQuery from 'react-responsive';
// file upload modal form
import axios from 'axios';
import firebase from 'firebase';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import ReCAPTCHA from 'react-google-recaptcha';
// modal
import Modal from '../../components/Modal';

import Typing from '../../components/typing';

import { getRandomInt } from '../../utils/numbers';

import './style.scss';

// airtable and firebase config stuff
const config = {
  apiKey: 'FIREBASE_API_KEY',
  authDomain: 'FIREBASE_AUTH_DOMAIN',
  databaseURL: 'https://FIREBASE_DATABASE_URL',
  projectId: 'FIREBASE_PROJECT_ID',
  storageBucket: 'FIREBASE_STORE_BUCKET',
  messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID',
};
let captcha;
// initialize firebase app
firebase.initializeApp(config);

export default class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formModal: false,
      firstname: '',
      lastname: '',
      email: '',
      github: '',
      linkedin: '',
      city: '',
      municipality: '',
      cvIsUploading: false,
      cvProgress: null,
      cvurl: '',
      cvError: '',
      clIsUploading: false,
      clProgress: null,
      clurl: '',
      clError: '',
      uploadMessage: '',
      uploadStatus: '',
      disabled: true,
      showButton: false,
    };
  }

  onFormSubmit = () => {
    const { firstname, lastname, city, municipality, email, github, linkedin, cvurl, clurl } = this.state;
    const fullname = `${firstname} ${lastname}`;
    axios
      .post(
        'https://AIRTABLE_API_URL/v0/AIRTABLE_BASE/AIRTABLE_TABLE',
        {
          fields: {
            Attachments: [
              {
                url: cvurl,
                filename: `${fullname} CV`,
              },
              {
                url: clurl,
                filename: `${fullname} Cover Letter`,
              },
            ],
            'Email Address': email,
            'First Name': firstname,
            'Last Name': lastname,
            'Full Name': fullname,
            City: city,
            Municipality: municipality,
            'LinkedIn Account': linkedin,
            'Github Account': github,
          },
        },
        {
          headers: {
            Authorization: 'Bearer AIRTABLE_API_KEY',
            'Content-type': 'application/json',
          },
        },
      )
      .then(() => this.setState({
        uploadMessage: 'Success! We have received your application and will get back to you soon. Thank you for applying and good luck! - Mistral Team', uploadStatus: 'success',
      }))
      .catch(() => this.setState({
        uploadMessage: 'Oh No! Something went wrong. Please try again later or send your application via e-mail: amilaav@mistral.ba. Thank you and good luck! – Mistral team',
        uploadStatus: 'error',
      }));
  }

  openFormModal = () => {
    this.setState({
      formModal: true,
    });
  };

  closeFormModal = () => {
    captcha.reset();
    this.setState({
      formModal: false,
      firstname: '',
      lastname: '',
      email: '',
      github: '',
      linkedin: '',
      city: '',
      municipality: '',
      cvIsUploading: false,
      cvProgress: null,
      cvurl: '',
      cvError: '',
      clIsUploading: false,
      clProgress: null,
      clurl: '',
      clError: '',
      uploadMessage: '',
      uploadStatus: '',
      disabled: true,
      showButton: false,
    });
  };

  checkDisabled = (item) => {
    const { firstname, lastname, city, municipality, email, cvurl } = this.state;
    const checking = (item === 'firstname' ? true : firstname)
      && (item === 'lastname' ? true : lastname)
      && (item === 'city' ? true : city)
      && (item === 'email' ? true : email)
      && (item === 'cv' ? true : cvurl);
    return !(city.toLowerCase() === 'sarajevo' ? (checking && (item === 'municipality' ? true : municipality) && (item === 'city' ? municipality : city)) : checking);
  };

  // handle form input change value
  handleChangeInput = event => {
    const disabled = this.checkDisabled(event.target.name);
    this.setState({ [event.target.name]: event.target.value, disabled });
  }
  // file upload methods
  handleUploadStart = item => this.setState({ [`${item}IsUploading`]: true, [`${item}Progress`]: 0 });

  handleProgress = (progress, item) => this.setState({ [`${item}Progress`]: progress });

  handleUploadError = (error, item) => this.setState({ [`${item}IsUploading`]: false, [`${item}Error`]: error });

  handleUploadSuccess = (filename, item) => {
    firebase.storage().ref('FIREBASE_PROJECT_ID')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        const disabled = this.checkDisabled(item);
        this.setState({ [`${item}IsUploading`]: false, [`${item}Progress`]: 100, [`${item}url`]: url, disabled });
      });
  };

  onRecaptchaChange = () => this.setState({showButton: true});


  render() {
    return (
      <div>
        <Modal
          visible={this.state.formModal}
          onClose={this.closeFormModal}
          measure="%"
          width={70}
          height={50}
          customStyles={{
            overflow: 'scroll',
          }}
        >
          <h2>content</h2>
          <div className="grid grid-gap-2 grid-cols-2">
            <div className="form-group mb-2">
              <label htmlFor="firstname" className="block mb-1 bold">
                First name*:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.firstname}
                name="firstname"
                placeholder="Charles"
                id="firstname"
                onChange={this.handleChangeInput}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="lastname" className="block mb-1 bold">
                Last name*:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.lastname}
                name="lastname"
                placeholder="Xavier"
                id="lastname"
                onChange={this.handleChangeInput}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="city" className="block mb-1 bold">
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

            {this.state.city === 'Sarajevo' && (
              <div className="form-group mb-2">
                <label htmlFor="municipality" className="block mb-1 bold">
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

            <div className="form-group mb-2">
              <label htmlFor="linkedin" className="block mb-1 bold">
                Linkedin:{' '}
              </label>
              <input
                className="form-control"
                type="url"
                value={this.state.linkedin}
                name="linkedin"
                placeholder="https://www.linkedin.com/in/charles-xavier-7541684/"
                id="linkedin"
                onChange={this.handleChangeInput}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="github" className="block mb-1 bold">
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

            <div className="form-group mb-2">
              <label htmlFor="email" className="block mb-1 bold">
                Email*:{' '}
              </label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                name="email"
                placeholder="charles.xavier@x.man"
                id="email"
                onChange={this.handleChangeInput}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="cv" className="block mb-1 bold">
                CV*:{' '}
              </label>
              <FileUploader
                className="form-control"
                accept="application/msword, text/plain, application/pdf"
                name="cv"
                id="cv"
                randomizeFilename
                storageRef={firebase.storage().ref('FIREBASE_PROJECT_ID')}
                onUploadStart={() => this.handleUploadStart('cv')}
                onUploadError={(error) => this.handleUploadError(error, 'cv')}
                onUploadSuccess={(filename) => this.handleUploadSuccess(filename, 'cv')}
                onProgress={(progress) => this.handleProgress(progress, 'cv')}
              />
              {this.state.cvIsUploading && (
                <p className="block mt-2">Progress: {this.state.cvProgress}</p>
              )}
            </div>

            <div className="form-group mb-2">
              <label htmlFor="cl" className="block mb-1 bold">
                Cover letter:{' '}
              </label>
              <FileUploader
                accept="application/msword, text/plain, application/pdf"
                name="coverLetter"
                id="coverLetter"
                randomizeFilename
                storageRef={firebase.storage().ref('FIREBASE_PROJECT_ID')}
                onUploadStart={() => this.handleUploadStart('cl')}
                onUploadError={(error) => this.handleUploadError(error, 'cl')}
                onUploadSuccess={(filename) => this.handleUploadSuccess(filename, 'cl')}
                onProgress={(progress) => this.handleProgress(progress, 'cl')}
              />
              {this.state.clIsUploading && (
                <p className="block mt-2">Progress: {this.state.clProgress}</p>
              )}
            </div>

            {this.state.uploadMessage && <div className={this.state.uploadStatus}>{this.state.uploadMessage}</div>}
            <ReCAPTCHA
              ref={(el) => { captcha = el; }}
              sitekey="6LecEiUTAAAAAF5aq7krUNmH9pZUD9CeYtHHHAPF"
              onChange={this.onRecaptchaChange}
            />

            {(this.state.uploadStatus !== 'success' && this.state.showButton) && <button onClick={this.onFormSubmit} disabled={this.state.disabled}>Apply</button>}
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
                <MediaQuery query="(max-width: 1024px)">
                  <ReactTooltip />
                  <a
                    data-tip="Application form is enabled only on large screens."
                    className="block mt-3 relative z-1 link link--gigi hero__btn uppercase"
                  >
                    <span>WE LIKE THAT. LET'S PUT YOUR TALENTS TO WORK.</span>
                  </a>
                </MediaQuery>
                <MediaQuery query="(min-width: 1025px)">
                  <a
                    onClick={this.openFormModal}
                    role="button"
                    tabIndex="-1"
                    data-tip="You can apply until November 18th, 2017"
                    className="block mt-3 relative z-1 link link--gigi hero__btn hero__btn--active uppercase"
                  >
                    <span>WE LIKE THAT. LET'S PUT YOUR TALENTS TO WORK.</span>
                  </a>
                </MediaQuery>
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
