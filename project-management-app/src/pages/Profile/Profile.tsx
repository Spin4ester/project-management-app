import React from 'react';
import { useTranslation } from 'react-i18next';

export function Profile() {
  const { t } = useTranslation();
  return <div className="profile_container">{t('Profile')}</div>;
}
