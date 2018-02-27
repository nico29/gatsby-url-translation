import React from 'react';
import Link from 'gatsby-link';
import { translate } from 'react-i18next';
import { languages, pages } from '../slugmap';
import i18n from '../i18n';

const routes = [
  'cat',
  'dog'
];

function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
}

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { lang: 'en' };
  }

  render () {
    // i18n.language points to Fr-fr for instance
    const lang = i18n.languages[0];
    const links = routes.map((route, index) => {
      return (
        <li key={ index }>
          <Link to={ pages[route][lang] }>{ pages[route][lang] }</Link>
        </li>
      );
    });
    const { t } = this.props;
    return (
      <section>
          <h2>{ t('navigateTo') }:</h2>
          <ul>{ links }</ul>
      </section>
    );
  }
}

export default translate('home')(HomePage);
