import React from 'react';
import './style.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__inner flex flex-wrap flex-between flex-gap-6 px-3 mx-auto">
      <div className="block grow-1 center flex flex-center flex-gap-4">
        <img
          src={'/img/footer-logo.png'}
          className="img-responsive"
          alt="Mistral Footer logo"
        />
        <div className="flex flex-start flex-column footer__copy__right">
          <h6 className="pb-2">
            <span role="img" aria-label="copyright sign">
              ©
            </span>{' '}
            Mistral {new Date().getFullYear()}
          </h6>
          <p>
            Milana Preloga 12/3, Bosmal City Center<br /> 71000 Sarajevo, Bosnia
            and Herzegovina
          </p>
        </div>
      </div>
      <div className="block grow-1 footer__desc center uppercase ">
        <h6 className="mb-3">Powered by</h6>
        <div className="w-100 flex flex-center flex-gap-3">
          <div>
            <img
              src={'/img/logo_ilo.png'}
              className="img-responsive footer__desc__logo"
              alt="International Labour Organization"
            />
          </div>
          <div className="flex flex-center flex-row flex-gap-2">
            <img
              src={'/img/logo_ng.png'}
              className="img-responsive footer__desc__logo"
              alt="Munipacity Novi Grad"
            />
            <div className="flex flex-column capitalize flex-start">
              <span>Municipality</span>
              <span>Novi Grad</span>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <div>Public Call</div>
          <a
            href="/MISTRAL_Javni_poziv.pdf"
            target="_blank"
            className="public_call"
          >
            Download here!
          </a>
        </div>
      </div>
    </div>
    <div className="footer__since uppercase">Since 2010</div>
    <div className="footer__borders w-100 block absolute bottom-0">
      <div className="border inline-block w-25 relative" />
      <div className="border inline-block w-25 relative" />
      <div className="border inline-block w-25 relative" />
      <div className="border inline-block w-25 relative" />
    </div>
  </footer>
);
