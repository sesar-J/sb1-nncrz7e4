import React, { createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import enUS from '../locales/en-US';
import zhCN from '../locales/zh-CN';
import { ConfigProvider } from 'antd';
import enUSAntd from 'antd/locale/en_US';
import zhCNAntd from 'antd/locale/zh_CN';

const locales = {
  'en-US': { messages: enUS, antd: enUSAntd },
  'zh-CN': { messages: zhCN, antd: zhCNAntd },
};

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState('zh-CN');

  const value = {
    locale,
    setLocale,
  };

  return (
    <LocaleContext.Provider value={value}>
      <ConfigProvider locale={locales[locale as keyof typeof locales].antd}>
        <IntlProvider
          messages={locales[locale as keyof typeof locales].messages}
          locale={locale}
          defaultLocale="zh-CN"
        >
          {children}
        </IntlProvider>
      </ConfigProvider>
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};