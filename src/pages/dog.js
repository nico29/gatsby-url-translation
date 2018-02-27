import React from 'react';
import { translate } from 'react-i18next';

function Page({ pathContext, t }) {
  const lang = pathContext.lang || 'en';
  return (
    <div>
      🐕: { t('content') }
    </div>
  );
}

export default translate('dog')(Page);
