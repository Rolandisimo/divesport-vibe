import { HashRouter, Routes, Route } from 'react-router-dom';
import type { ComponentType } from 'react';
import { LangProvider } from '@/context/LangContext';
import { LightboxProvider } from '@/context/LightboxContext';
import type { Lang } from '@/types/content';
import {
  HomePage,
  AboutPage,
  ApmacibaHubPage,
  ApmacibaKursiPage,
  ApmacibaSpecializacijasPage,
  ApmacibaTehniskaNirsanaPage,
  ApmacibaInstruktoruKursiPage,
  CelojumiHubPage,
  CelojumiFotoPage,
  InventarsHubPage,
  InventarsNomaPage,
  InventarsRemontsPage,
  InventarsBalonuUzpildisanaPage,
  KontaktiPage,
} from '@/pages';

/**
 * Every distinct page "kind" and its LV URL segment. The RU version of every
 * route is automatically registered too, at `/ru<path>` — so adding a new
 * page here only ever means writing ONE component, not two.
 */
const PAGES: { path: string; Component: ComponentType }[] = [
  { path: '/', Component: HomePage },
  { path: '/par-mums', Component: AboutPage },
  { path: '/apmaciba', Component: ApmacibaHubPage },
  { path: '/apmaciba-kursi', Component: ApmacibaKursiPage },
  { path: '/apmaciba-specializacijas', Component: ApmacibaSpecializacijasPage },
  { path: '/apmaciba-tehniska-nirsana', Component: ApmacibaTehniskaNirsanaPage },
  { path: '/apmaciba-instruktoru-kursi', Component: ApmacibaInstruktoruKursiPage },
  { path: '/celojumi', Component: CelojumiHubPage },
  { path: '/celojumi-foto', Component: CelojumiFotoPage },
  { path: '/inventars', Component: InventarsHubPage },
  { path: '/inventars-noma', Component: InventarsNomaPage },
  { path: '/inventars-remonts', Component: InventarsRemontsPage },
  { path: '/inventars-balonu-uzpildisana', Component: InventarsBalonuUzpildisanaPage },
  { path: '/kontakti', Component: KontaktiPage },
];

function withLang(lang: Lang, Component: ComponentType) {
  return (
    <LangProvider lang={lang}>
      <LightboxProvider>
        <Component />
      </LightboxProvider>
    </LangProvider>
  );
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        {PAGES.map(({ path, Component }) => (
          <Route key={`lv:${path}`} path={path} element={withLang('lv', Component)} />
        ))}
        {PAGES.map(({ path, Component }) => (
          <Route
            key={`ru:${path}`}
            path={path === '/' ? '/ru' : `/ru${path}`}
            element={withLang('ru', Component)}
          />
        ))}
      </Routes>
    </HashRouter>
  );
}
