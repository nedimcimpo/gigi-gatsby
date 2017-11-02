import React from 'react';
import './styles.scss';

export const ErrorPage = () => (
  <section id="error" className="error__page">
    <div className="code-area">
      <span
        style={{
          color: '#777',
          fontStyle: 'italic',
        }}
      >
        {'//oops.Page not supported.'}
      </span>
      <span>
        <span style={{ color: '#d65562' }}>if</span>
        {'('}
        <span style={{ fontStyle: 'italic', color: '#bdbdbd' }}>found</span>
        {')'}
        {'{'}
      </span>
      <span>
        <span style={{ paddingLeft: '15px', color: '#2796ec' }}>
          <i style={{ width: '10px', display: 'inline-block' }} />throw
        </span>
        <span>
          {'('}
          <span style={{ color: '#a6a61f' }}>
            "Mobile view currently under construction"
          </span>
          {');'}
        </span>
        <span style={{ display: 'block' }}>}</span>
      </span>
    </div>
  </section>
);
