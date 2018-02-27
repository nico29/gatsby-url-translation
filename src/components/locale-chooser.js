import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { navigateTo } from 'gatsby-link';
import { languages as langs, pages } from '../slugmap';

function findTranslatedSlug (previousLang, newLang, slug) {
    const translations = Object.values(pages);
    const matchingPage = translations.filter(translation => translation[previousLang] === slug)[0];
    return !matchingPage ? '' : matchingPage[newLang];
}

class LanguageSwitcher extends Component {
    constructor(props) {
        super(props);
        const { i18n } = this.props;
        this.state = { language: i18n.language };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({ language: nextProps.i18n.language });
    }

    handleChangeLanguage (lang) {
        const { i18n } = this.props;
        const previousLang = i18n.language;
        i18n.changeLanguage(lang);
        // route to url matching translation
        const pathName = window.location.pathname.replace('/', '');
        navigateTo('/' + findTranslatedSlug(previousLang, lang, pathName));
    }

    renderLanguageChoice ({ code, label }) {
        return (
            <button
                key={ code }
                onClick={ () => this.handleChangeLanguage(code) }
                style={{ margin: '0 1rem' }}
            >
                { label }
            </button>
        );
    }

    render () {
        const languages = langs.map(lang => { return { code: lang, label: lang.toUpperCase() }; });

        return (
            <div style={{ padding: '1rem 0' }}>
                { languages.map(language => this.renderLanguageChoice(language)) }
            </div>
        );
    }
}

export default translate()(LanguageSwitcher);
