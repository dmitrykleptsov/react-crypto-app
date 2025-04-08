import React from 'react';
import { Layout } from 'antd';
import AppHeader from './components/layout/AppHeader';
import AppSider from './components/layout/AppSider';
import AppContent from './components/layout/AppContent';

const App: React.FC = () => (
	<Layout>
		<AppHeader />
      	<Layout>
			<AppSider />
			<AppContent />
      	</Layout>
    </Layout>
)

export default App