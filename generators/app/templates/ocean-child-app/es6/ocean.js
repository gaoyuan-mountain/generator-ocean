import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import AppEntry from './entry.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AppEntry,
  domElementGetter: () => document.getElementById('<%= projectName %>'),
});

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];
