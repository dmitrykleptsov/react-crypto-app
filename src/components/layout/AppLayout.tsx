import { Layout, Spin } from 'antd'
import AppContent from './AppContent'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import CryptoContext from '../../context/crypto-context'
import { useContext } from 'react'

const AppLayout: React.FC = () => {
	const { loading } = useContext(CryptoContext)

	if (loading) {
		return <Spin fullscreen />
	}

	return (
		<Layout>
			<AppHeader />
			<Layout>
				<AppSider />
				<AppContent />
			</Layout>
		</Layout>
	)
}

export default AppLayout
