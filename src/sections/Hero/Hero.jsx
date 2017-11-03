import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import MediaQuery from 'react-responsive';
// file upload modal form
import axios from 'axios';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
// modal
import Modal from '../../components/Modal';

import Typing from '../../components/typing';

import { getRandomInt } from '../../utils/numbers';

import './style.scss';

// airtable and firebase config stuff
const configAirtable = {
  base: 'AIRTABLE_BASE',
  table: 'AIRTABLE_TABLE',
  view: 'All AIRTABLE_TABLE',
  apiKey: 'AIRTABLE_API_KEY',
  maxRecords: '3',
};

const config = {
  apiKey: 'FIREBASE_API_KEY',
  authDomain: 'FIREBASE_AUTH_DOMAIN',
  databaseURL: 'https://FIREBASE_DATABASE_URL',
  projectId: 'FIREBASE_PROJECT_ID',
  storageBucket: 'FIREBASE_STORE_BUCKET',
  messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID',
};

// initialize firebase app
firebase.initializeApp(config);

export default class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formModal: false,
    };
  }

  openFormModal = () => {
    this.setState({
      formModal: true,
    });
  };

  closeFormModal = () => {
    this.setState({
      formModal: false,
    });
  };

  // handle form input change value
  handleChangeInput = event =>
    this.setState({ [event.target.name]: event.target.value });

  // file upload methods
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState(
      { avatar: filename, progress: 100, isUploading: false },
      () => {
        firebase
          .storage()
          .ref('FIREBASE_PROJECT_ID')
          .child(filename)
          .getDownloadURL()
          .then(url => {
            axios
              .post(
                'https://AIRTABLE_API_URL/v0/AIRTABLE_BASE/AIRTABLE_TABLE',
                {
                  fields: {
                    Attachments: [
                      {
                        url,
                      },
                    ],
                    'Email Address': 'john@example.com',
                    'First Name': this.state.firstname,
                    'Last Name': this.state.lastname,
                    'Full Name': `${this.state.firstname} ${this.state
                      .lastname}`,
                    City: this.state.city,
                    Municipality: this.state.municipality,
                    'LinkedIn Account': this.state.linkedin,
                    'Github Account': this.state.github,
                  },
                },
                {
                  headers: {
                    Authorization: 'Bearer AIRTABLE_API_KEY',
                    'Content-type': 'application/json',
                  },
                },
              )
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.log(error);
              });
            this.setState({ avatarURL: url });
          });
      },
    );
  };

  render() {
    return (
      <div>
        <Modal
          visible={this.state.formModal}
          onClose={this.closeFormModal}
          measure="%"
          width={35}
          height={50}
        >
          <h2>content</h2>
          <form className="grid grid-gap-2 grid-cols-2">
            <div className="form-group mb-2">
              <label htmlFor="firstname" className="block mb-1 bold">
                First name:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.firstname}
                name="firstname"
                id="firstname"
                onChange={this.handleChangeInput}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="lastname" className="block mb-1 bold">
                Last name:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.lastname}
                name="lastname"
                id="lastname"
                onChange={this.handleChangeInput}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="city" className="block mb-1 bold">
                City:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.city}
                name="city"
                id="city"
                onChange={this.handleChangeInput}
                required
              />
            </div>

            {this.state.city === 'Sarajevo' && (
              <div className="form-group mb-2">
                <label htmlFor="municipality" className="block mb-1 bold">
                  Municipality:{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.municipality}
                  name="municipality"
                  id="municipality"
                  onChange={this.handleChangeInput}
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
                id="github"
                onChange={this.handleChangeInput}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="email" className="block mb-1 bold">
                Email:{' '}
              </label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                name="email"
                id="email"
                onChange={this.handleChangeInput}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="cvUpload" className="block mb-1 bold">
                CV:{' '}
              </label>
              <FileUploader
                className="form-control"
                accept="application/msword, text/plain, application/pdf"
                name="cvUpload"
                id="cvUpload"
                randomizeFilename
                storageRef={firebase.storage().ref('FIREBASE_PROJECT_ID')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
              {this.state.isUploading && (
                <p className="block mt-2">Progress: {this.state.progress}</p>
              )}
            </div>

            <div className="form-group mb-2">
              <label htmlFor="coverLetter" className="block mb-1 bold">
                Cover letter:{' '}
              </label>
              <FileUploader
                accept="application/msword, text/plain, application/pdf"
                name="coverLetter"
                id="coverLetter"
                randomizeFilename
                storageRef={firebase.storage().ref('FIREBASE_PROJECT_ID')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
              {this.state.isUploading && (
                <p className="block mt-2">Progress: {this.state.progress}</p>
              )}
            </div>
          </form>
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
                  <span className="inline-block">
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
