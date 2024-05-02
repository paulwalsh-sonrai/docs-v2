export { PageShell };

import React, { useEffect, useState } from 'react';
import logoUrl from './logo.svg';
import { PageContextProvider } from './usePageContext';
import { Link } from './Link';
import type { PageContext } from 'vike/types';
import './css/index.css';
import './PageShell.css';
import {
  Sidebar as ReactSideBar,
  Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';

async function getSidebarConfig() {
  const files = Object.keys(import.meta.glob('../pages/**/*.mdx')); // Adjust the glob pattern as needed
  let sidebarConfig = [];

  for (const path of files) {
    const filePath = path.replace('../pages/', '').replace('/Page.mdx', ''); // Remove the '../pages/' prefix
    const segments = filePath.split('/');

    let currentLevel = sidebarConfig;

    segments.forEach((segment, index) => {
      const isLastSegment = index === segments.length - 1;
      const isDirectory = !isLastSegment; // Last segment is a file, not a directory

      let existingItem = currentLevel.find((item) => item.label === segment);

      if (!existingItem) {
        existingItem = {
          type: isDirectory ? 'category' : 'doc',
          label: segment,
          items: isDirectory ? [] : null,
        };
        currentLevel.push(existingItem);
      }

      if (isDirectory) {
        currentLevel = existingItem.items;
      }
    });
  }

  return sidebarConfig;
}

function PageShell({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: React.ReactNode;
}) {
  const modules = import.meta.glob('../pages');
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Layout>
          <Sidebar></Sidebar>
          <Content>{children}</Content>
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto',
      }}
    >
      {children}
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarItems, setSideBarItems] = useState();

  useEffect(() => {
    // Call the function and log the sidebar configuration
    getSidebarConfig().then((config) => {
      return setSideBarItems(config);
    });
  }, []);

  const renderSidebarItems = (items) => {
    return items?.length
      ? items.map((item, index) => {
          if (item.type === 'category') {
            return (
              <SubMenu key={index} title={item.label} label={item.label}>
                {renderSidebarItems(item.items)}
              </SubMenu>
            );
          } else {
            return <MenuItem key={index}>{item.label}</MenuItem>;
          }
        })
      : [];
  };

  return (
    <div
      id="sidebar"
      style={{
        padding: 20,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1.8em',
        borderRight: '2px solid #eee',
      }}
    >
      <ReactSideBar>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
          iconShape="square"
        >
          {renderSidebarItems(sidebarItems)}
        </Menu>
      </ReactSideBar>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
