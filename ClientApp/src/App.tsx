import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Todo } from './components/Todo';

import './custom.css'

const App: React.FC = () => {
  return <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/todo' component={Todo} />
  </Layout>
}

export default App;
