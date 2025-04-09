import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import CryptoContext from '../../context/crypto-context'
import { useContext, useEffect, useState } from 'react'
import CointInfoModal from '../../components/CointInfoModal'
import { ICrypto } from '../../types/types'
import AddAssetForm from '../../components/AddAssetForm'

const headerStyle: React.CSSProperties = {
	width: '100%',
	textAlign: 'center',
	height: 60,
	padding: '1rem',
	background: 'white',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center'
}

const AppHeader: React.FC = () => {
	const [select, setSelect] = useState(false)
	const [modal, setModal] = useState(false)
	const [drawer, setDrawer] = useState(false)
	const [coin, setCoin] = useState<ICrypto | null>(null)
	const { crypto } = useContext(CryptoContext)

	useEffect(() => {
		const keypress = (e: KeyboardEvent) => {
			if (e.key === '/') {
				setSelect(prev => !prev)
			}
		}
		window.addEventListener('keypress', keypress)
		return () => {
			window.removeEventListener('keypress', keypress)
		}
	}, [])

	const handleChange = (value: string) => {
		const foundCoin = crypto.find(coin => coin.id === value)
		setCoin(foundCoin ?? null)
		setModal(true)
	}

	return (
		<Layout.Header style={headerStyle}>
			<Select
				open={select}
				style={{ width: 250 }}
				onSelect={handleChange}
				onClick={() => setSelect(prev => !prev)}
				value={['press / to open']}
				options={crypto.map(coin => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon
				}))}
				optionRender={option => (
					<Space>
						<img style={{ width: 20, height: 20 }} src={option.data.icon} alt={option.data.label} />
						{option.data.label}
					</Space>
				)}
			/>

			<Button type='primary' onClick={() => setDrawer(true)}>
				Add Asset
			</Button>

			<Modal
				open={modal}
				onCancel={() => {
					setModal(false)
				}}
				footer={null}
			>
				{coin && <CointInfoModal coin={coin} />}
			</Modal>

			<Drawer width={600} title='Add Asset' onClose={() => setDrawer(false)} open={drawer}>
				<AddAssetForm />
			</Drawer>
		</Layout.Header>
	)
}

export default AppHeader
